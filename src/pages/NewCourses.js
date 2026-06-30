import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import HeaderTop from "../components/HeaderTop";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate } from "react-router-dom";

function NewCourses() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  let role = null;
  let username = "Student";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role =
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] || decoded.role;
      username = decoded["Username"] || decoded.name || "Student";
    } catch (err) {
      console.error("JWT decode error", err);
    }
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState({});

  const agricultureCourses = [
    {
      id: "agri-101",
      code: "AGRI: Principles Of Agronomy & Crop Production",
      department: "Agricultural Sciences & Engineering",
      instructor: "Prof. M. S. Swaminathan",
      institute: "ICAR - IARI New Delhi",
    },
    {
      id: "agri-102",
      code: "AGRI: Organic Farming & Soil Fertility Management",
      department: "Soil Science & Agricultural Chemistry",
      instructor: "Prof. Ramesh Chand",
      institute: "ICAR - IARI New Delhi",
    },
    {
      id: "agri-103",
      code: "AGRI: Advanced Plant Breeding & Genetics",
      department: "Genetics & Plant Breeding",
      instructor: "Dr. Trilochan Mohapatra",
      institute: "ICAR - CRRI Cuttack",
    },
    {
      id: "agri-104",
      code: "AGRI: Precision Agriculture & IoT in Farming",
      department: "Agricultural Engineering & Technology",
      instructor: "Prof. Indra Mani",
      institute: "ICAR - CIAE Bhopal",
    },
    {
      id: "agri-105",
      code: "AGRI: Post-Harvest Technology & Food Processing",
      department: "Food Technology & Post-Harvest Engineering",
      instructor: "Dr. S. N. Jha",
      institute: "ICAR - CIPHET Ludhiana",
    },
    {
      id: "agri-106",
      code: "AGRI: Sustainable Irrigation & Watershed Management",
      department: "Water Science & Agricultural Engineering",
      instructor: "Prof. Alok K. Sikka",
      institute: "ICAR - IIWM Bhubaneswar",
    },
    {
      id: "agri-107",
      code: "AGRI: Plant Pathology & Integrated Pest Management",
      department: "Plant Protection & Pathology",
      instructor: "Dr. Anupam Varma",
      institute: "ICAR - NCIPM New Delhi",
    },
    {
      id: "agri-108",
      code: "AGRI: Agricultural Economics & Agribusiness Management",
      department: "Agricultural Economics & Extension",
      instructor: "Prof. Vijay Paul Sharma",
      institute: "ICAR - NAARM Hyderabad",
    },
  ];

  const filteredCourses = agricultureCourses.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (id) => {
    setEnrolledCourses((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div id="main_content" className="font-muli theme-blush">
      <HeaderTop />
      <RightSidebar />
      <LeftSidebar role={role} />

      <div className="section-wrapper">
        <div className="page admin-dashboard">
          <style>{`
            .agri-courses-container {
              padding: 20px 0;
            }
            .agri-course-card {
              background: #ffffff;
              border-radius: 8px;
              border-left: 4px solid #3b82f6;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
              padding: 22px 24px;
              position: relative;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              transition: all 0.25s ease;
              cursor: pointer;
              border-top: 1px solid #f1f5f9;
              border-right: 1px solid #f1f5f9;
              border-bottom: 1px solid #f1f5f9;
            }
            .agri-course-card:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
              border-left-color: #e65f1e;
            }
            .agri-course-title {
              font-size: 1.05rem;
              font-weight: 700;
              color: #1e293b;
              margin-bottom: 6px;
              padding-right: 25px;
              line-height: 1.4;
            }
            .agri-course-dept {
              font-size: 0.88rem;
              color: #94a3b8;
              font-weight: 500;
              margin-bottom: 24px;
            }
            .agri-course-arrow {
              position: absolute;
              right: 22px;
              top: 38%;
              font-size: 1.1rem;
              color: #0f172a;
              font-weight: bold;
              transition: transform 0.2s;
            }
            .agri-course-card:hover .agri-course-arrow {
              transform: translateX(4px);
              color: #e65f1e;
            }
            .agri-course-instructor {
              font-size: 0.85rem;
              color: #64748b;
              font-weight: 600;
              margin-bottom: 2px;
            }
            .agri-course-inst {
              font-size: 0.82rem;
              color: #94a3b8;
              margin-bottom: 0;
            }
            .agri-enroll-btn {
              background-color: #fee2e2;
              color: #ef4444;
              border: none;
              border-radius: 20px;
              padding: 6px 18px;
              font-size: 0.82rem;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.2s ease;
              white-space: nowrap;
            }
            .agri-enroll-btn:hover {
              background-color: #fecaca;
              color: #dc2626;
            }
            .agri-enrolled-badge {
              background-color: #dcfce7;
              color: #16a34a;
              border: none;
              border-radius: 20px;
              padding: 6px 18px;
              font-size: 0.82rem;
              font-weight: 700;
              white-space: nowrap;
            }
            .agri-search-input {
              border: 1px solid #e2e8f0;
              border-radius: 30px;
              padding: 10px 22px;
              font-size: 0.95rem;
              width: 100%;
              max-width: 400px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.02);
              outline: none;
              transition: border-color 0.2s;
            }
            .agri-search-input:focus {
              border-color: #e65f1e;
            }
          `}</style>

          <div className="section-body mt-3 pt-0">
            <div className="container-fluid agri-courses-container">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
                <div>
                  <h2 className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "1.6rem" }}>
                    New Courses (Agriculture)
                  </h2>
                  <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                    Explore and enroll in specialized agricultural research and engineering programs.
                  </p>
                </div>
                <div className="mt-3 mt-md-0">
                  <input
                    type="text"
                    className="agri-search-input"
                    placeholder="Search agriculture courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-4">
                {filteredCourses.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <h5 className="text-muted">No agriculture courses matching "{searchTerm}"</h5>
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <div className="col-md-6 mb-4" key={course.id}>
                      <div className="agri-course-card">
                        <div>
                          <div className="agri-course-title">{course.code}</div>
                          <div className="agri-course-dept">{course.department}</div>
                          <span className="agri-course-arrow">
                            <i className="fa-solid fa-chevron-right"></i>
                          </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-end mt-3 pt-2">
                          <div>
                            <div className="agri-course-instructor">{course.instructor}</div>
                            <div className="agri-course-inst">{course.institute}</div>
                          </div>
                          <div>
                            {enrolledCourses[course.id] ? (
                              <span className="agri-enrolled-badge">
                                <i className="fa-solid fa-check me-1"></i> Enrolled
                              </span>
                            ) : (
                              <button
                                type="button"
                                className="agri-enroll-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEnroll(course.id);
                                }}
                              >
                                Enroll Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourses;
