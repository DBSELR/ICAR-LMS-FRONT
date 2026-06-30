import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../config";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      // IMPORTANT: backend route is /api/Auth/Login
      const response = await fetch(`${API_BASE_URL}/Auth/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
      });

      // Handle 403 (overdue fees) or other non-OK statuses
      if (!response.ok) {
        let msg = "Login failed.";
        try {
          const maybeJson = await response.json();
          msg =
            maybeJson?.message || maybeJson?.title || maybeJson?.error || msg;
        } catch {
          const text = await response.text();
          if (text) msg = text;
        }
        alert(msg);
        setSubmitting(false);
        return;
      }

      // Expected shape: { token, menus: [ { mmid, mainMenuName, text, icon, path, order } ] }
      const data = await response.json();
      const token = data?.token;
      if (!token) {
        alert("Invalid response from server (no token).");
        setSubmitting(false);
        return;
      }

      // Persist token (+ remember me)
      if (form.remember) {
        localStorage.setItem("jwt", token);
      } else {
        // still store in localStorage so existing app hooks keep working
        // but you could switch to sessionStorage here if you prefer
        localStorage.setItem("jwt", token);
      }

      // Persist server-driven menus if provided
      if (Array.isArray(data?.menus)) {
        localStorage.setItem("menus", JSON.stringify(data.menus));
      } else {
        localStorage.removeItem("menus");
      }

      // Notify other tabs/components
      window.dispatchEvent(new Event("storage"));

      // Decode token to route by role
      let role = "";
      try {
        const decoded = jwtDecode(token);
        role =
          decoded?.[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] ||
          decoded?.role ||
          decoded?.["roles"] || // sometimes frameworks use 'roles'
          "";
      } catch (err) {
        console.error("Token decode failed:", err);
      }

      // Navigate by role
      switch (role) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "Business_Executive":
          navigate("/business-executive-dashboard");
          break;
        case "Faculty":
          navigate("/instructor-dashboard");
          break;
        case "SRO":
          navigate("/sro-dashboard");
          break;
        case "Student":
          navigate("/student-dashboard");
          break;
        case "Parent":
          navigate("/parent-dashboard");
          break;
        case "Accountant":
          navigate("/accountant-dashboard");
          break;
        case "College":
          navigate("/college-dashboard");
          break;
        case "Director":
          navigate("/director-dashboard");
          break;
          case "AppGenesis":
          navigate("/appGenesis-dashboard");
          break;

        default:
          alert("Unknown role in token. Please contact admin.");
          break;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lms-login-container">
      <style>{`
        .lms-login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #eaf8f0 0%, #f4fbf7 45%, #fffef9 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          padding-bottom: 70px; /* Space for fixed privacy footer */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }
        .floating-agri-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        .agri-icon {
          position: absolute;
          opacity: 0.22;
        }
        .icon-1 { top: 12%; left: 8%; font-size: 2.8rem; color: #16a34a; animation: floatUp 15s infinite ease-in-out; }
        .icon-2 { top: 75%; left: 14%; font-size: 3.2rem; color: #e65f1e; animation: floatSide 18s infinite ease-in-out; }
        .icon-3 { top: 20%; right: 10%; font-size: 3.5rem; color: #ca8a04; animation: floatDiagonal 16s infinite ease-in-out; }
        .icon-4 { top: 82%; right: 12%; font-size: 2.5rem; color: #16a34a; animation: floatUp 20s infinite ease-in-out; }
        .icon-5 { top: 45%; left: 5%; font-size: 2.4rem; color: #059669; animation: floatDiagonal 14s infinite ease-in-out; }
        .icon-6 { top: 15%; left: 45%; font-size: 2.2rem; color: #0284c7; animation: floatSide 17s infinite ease-in-out; }
        .icon-7 { top: 60%; right: 5%; font-size: 3rem; color: #15803d; animation: floatUp 19s infinite ease-in-out; }
        .icon-8 { top: 85%; left: 45%; font-size: 2.6rem; color: #d97706; animation: floatSide 15s infinite ease-in-out; }
        .icon-9 { top: 35%; right: 28%; font-size: 2.3rem; color: #16a34a; animation: floatDiagonal 22s infinite ease-in-out; }
        .lms-back-wrapper {
          position: absolute;
          top: 30px;
          left: 40px;
          z-index: 20;
        }
        .lms-back-btn {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          color: #1e293b;
          text-decoration: none;
          padding: 10px 22px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.92rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(22, 163, 74, 0.1);
          border: 1px solid rgba(22, 163, 74, 0.22);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .lms-back-btn:hover {
          background: #e65f1e;
          color: #ffffff;
          transform: translateX(-4px);
          box-shadow: 0 6px 18px rgba(230, 95, 30, 0.28);
          border-color: #e65f1e;
        }
        @media (max-width: 768px) {
          .lms-back-wrapper {
            position: relative;
            top: auto;
            left: auto;
            margin-bottom: 20px;
            align-self: flex-start;
          }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(12deg); }
        }
        @keyframes floatSide {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(35px) rotate(-10deg); }
        }
        @keyframes floatDiagonal {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-25px, -25px) rotate(15deg); }
        }
        .lms-login-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(22, 163, 74, 0.05);
          max-width: 850px;
          width: 100%;
          display: flex;
          flex-direction: row;
          overflow: hidden;
          border: 1px solid rgba(22, 163, 74, 0.18);
          position: relative;
          z-index: 10;
        }
        .lms-login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          background: #ffffff;
        }
        .lms-login-divider {
          width: 1px;
          background: #cbd5e1;
          margin: 35px 0;
        }
        .lms-login-right {
          flex: 1;
          padding: 45px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .lms-header-divider {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
        }
        .lms-header-line {
          flex-grow: 1;
          height: 1px;
          background: #cbd5e1;
        }
        .lms-header-text {
          padding: 0 16px;
          color: #475569;
          font-size: 0.95rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .lms-input-box {
          display: flex;
          align-items: center;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          background: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lms-input-box:focus-within {
          border-color: #e65f1e;
          box-shadow: 0 0 0 3px rgba(230, 95, 30, 0.15);
        }
        .lms-input-icon {
          padding-left: 14px;
          padding-right: 12px;
          color: #64748b;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }
        .lms-input-field {
          flex: 1;
          border: none;
          outline: none;
          padding: 11px 0;
          font-size: 0.95rem;
          color: #1e293b;
          background: transparent;
        }
        .lms-input-field::placeholder {
          color: #94a3b8;
        }
        .lms-eye-btn {
          background: none;
          border: none;
          padding: 0 14px;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .lms-eye-btn:hover {
          color: #e65f1e;
        }
        .lms-submit-btn {
          background: linear-gradient(135deg, #f97316 0%, #e65f1e 100%);
          color: #ffffff;
          border: none;
          border-radius: 6px;
          padding: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(230, 95, 30, 0.3);
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        .lms-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #fdba74 0%, #e65f1e 100%);
          box-shadow: 0 6px 18px rgba(230, 95, 30, 0.45);
          transform: translateY(-2px);
        }
        .lms-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .lms-login-card {
            flex-direction: column;
            max-width: 450px;
          }
          .lms-login-divider {
            width: 100%;
            height: 1px;
            margin: 0;
          }
          .lms-login-left {
            padding: 30px 20px;
          }
          .lms-login-right {
            padding: 30px 25px;
          }
        }
      `}</style>

      {/* Back to SA Land Home Page Button */}
      <div className="lms-back-wrapper">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          className="lms-back-btn"
        >
          <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
        </a>
      </div>

      {/* Floating Background Agriculture Elements */}
      <div className="floating-agri-bg">
        <i className="fa-solid fa-leaf agri-icon icon-1"></i>
        <i className="fa-solid fa-seedling agri-icon icon-2"></i>
        <i className="fa-solid fa-wheat-awn agri-icon icon-3"></i>
        <i className="fa-solid fa-tractor agri-icon icon-4"></i>
        <i className="fa-solid fa-spa agri-icon icon-5"></i>
        <i className="fa-solid fa-droplet agri-icon icon-6"></i>
        <i className="fa-solid fa-leaf agri-icon icon-7"></i>
        <i className="fa-solid fa-wheat-awn agri-icon icon-8"></i>
        <i className="fa-solid fa-seedling agri-icon icon-9"></i>
      </div>

      <div className="lms-login-card">
        {/* Left Side: Logo & Branding */}
        <div className="lms-login-left">
          <img
            src="/assets/logo.png"
            alt="LMS Logo"
            style={{ maxWidth: "260px", maxHeight: "150px", objectFit: "contain" }}
          />
        </div>

        {/* Vertical Divider */}
        <div className="lms-login-divider"></div>

        {/* Right Side: Login Form */}
        <div className="lms-login-right">
          <div className="lms-header-divider">
            <div className="lms-header-line"></div>
            <span className="lms-header-text">Login to LMS Portal</span>
            <div className="lms-header-line"></div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username Input */}
            <div className="mb-3">
              <div className="lms-input-box">
                <span className="lms-input-icon">
                  <i className="fa-regular fa-user"></i>
                </span>
                <input
                  type="text"
                  className="lms-input-field"
                  id="email"
                  name="email"
                  placeholder="Enter Username"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <div className="lms-input-box">
                <span className="lms-input-icon">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="lms-input-field"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lms-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}></i>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={submitting} className="lms-submit-btn">
              <i className="fa-solid fa-lock"></i>
              <span>{submitting ? "Logging in…" : "Login"}</span>
            </button>
          </form>
        </div>
      </div>

      <div className="privacy-footer">
        <a href="/privacy-policy" className="privacy-link">Privacy Policy</a>
        <a href="/refund-policy" className="privacy-link">Refund Policy</a>
        <a href="/return-exchange-policy" className="privacy-link">Return/Exchange Policy</a>
        <a href="/cancellation-policy" className="privacy-link">Cancellation Policy</a>
        <a href="/terms-and-conditions" className="privacy-link">Terms & Conditions</a>
      </div>
    </div>
  );
}

export default Login;
