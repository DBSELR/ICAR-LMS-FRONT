// File: src/pages/SRODashboard.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import HeaderTop from "../components/HeaderTop";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

function SRODashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    students: 0,
    programmes: 0,
    tasks: 0,
    leaves: 0,
    liveClasses: 0,
  });
  const [sroName, setSroName] = useState("SRO");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const name = decoded["Username"] || decoded.name || "SRO";
      setSroName(name);

      // if (role !== "SRO") {
      //   setLoading(false);
      //   navigate("/unauthorized");
      //   return;
      // }

      const fetchSummary = async () => {
        try {
          const token = localStorage.getItem("jwt");
          const res = await fetch(`${API_BASE_URL}/SROSummary/dashboard`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          const data = await res.json();
          setSummary({
            students: data.students || 0,
            programmes: data.programmes || 0,
            tasks: data.tasks || 0,
            leaves: data.leaves || 0,
            liveClasses: data.liveClasses || 0,
          });
        } catch (err) {
          console.error("Failed to fetch dashboard summary", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSummary();
    } catch (err) {
      console.error("Token decode error", err);
      setLoading(false);
    }
  }, []);

  const cards = [
    { label: "Tickets", value: summary.students, icon: "fa-ticket", link: "/instructor/support-tickets" },
    { label: "Tasks", value: summary.tasks, icon: "fa-tasks", link: "/taskboard" },
  ];

  return (
    <div id="main_content" className="font-muli theme-blush">
      {loading && (
        <div className="page-loader-wrapper">
          <div className="loader" />
        </div>
      )}

      <HeaderTop />
      <RightSidebar />
      <LeftSidebar role="SRO" />
      
      <div className="section-wrapper">
      <div className="page admin-dashboard">
        <div className="section-body mt-0 pt-0">
          <div className="container-fluid">

            {/* Welcome Header */}

            <div className="jumbotron bg-light rounded shadow-sm mb-3 welcome-card dashboard-hero">
                          <h2 className="page-title text-primary pt-0 dashboard-hero-title">
                            Welcome back, <strong>{sroName}</strong> 👋
                          </h2>
                          <p className="text-muted mb-0 dashboard-hero-sub">
                           Here’s a quick overview of your responsibilities.
                          </p>
                        </div>

            {/* Dashboard Cards */}
            <div className="row">
              {cards.map((item, idx) => (
                <div className="col-12 col-sm-6 col-lg-3 mb-3" key={idx}>
      <div
        className="welcome-card dashboard-card animate-welcome text-center"
        role="button"
        tabIndex={0}
        onClick={() => navigate(item.link)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(item.link)}
        // className="compact-card text-center shadow-sm"
        title={`Go to ${item.label}`}
        aria-label={`Open ${item.label}`}
      >
        <i className={`fa ${item.icon}  dashboard-icon text-primary`} aria-hidden="true" />
        <div className="dashboard-label text-muted">{item.label}</div>
        <div className="dashboard-count text-dark fw-bold">{item.value}</div>
      </div>
               </div>
              ))}
            </div>

          </div>
        </div>
        <Footer />
      </div>
      </div>

    </div>
  );
}

export default SRODashboard;
