import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  const saLandPaths = [
    "/",
    "/online-skill-development-courses-india",
    "/register",
    "/best-digital-marketing-course-online-india-with-certificate",
    "/best-graphic-design-course-online-india-with-certificate",
    "/best-video-editing-course-online-india-with-certificate",
    "/get-in-touch-ed-vedha",
    "/youtube-contact",
    "/privacy-policy",
    "/refund-policy",
    "/return-policy",
    "/cancellation-policy",
    "/terms-conditions",
    "/payment-result",
    "/book-demo",
    "/calendly-demo"
  ];

  const isSaLandCourseDetail = location.pathname.startsWith("/course/");
  const isSaLandPublicCourses = location.pathname === "/courses" && !localStorage.getItem("jwt");

  if (saLandPaths.includes(location.pathname) || isSaLandCourseDetail || isSaLandPublicCourses) {
    return null;
  }

  return (
    <footer className="footer fixed-footer">
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col-auto text-center">
            Developed by - D Base Solutions Pvt Ltd &copy; 2025
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
