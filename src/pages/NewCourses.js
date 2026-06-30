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
            .agri-card-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: 16px;
            }
            .agri-course-title {
              font-size: 1.05rem;
              font-weight: 700;
              color: #1e293b;
              margin-bottom: 4px;
              line-height: 1.4;
            }
            .agri-course-dept {
              font-size: 0.88rem;
              color: #94a3b8;
              font-weight: 500;
              margin-bottom: 24px;
            }
            .agri-course-arrow {
              width: 34px;
              height: 34px;
              border-radius: 50%;
              background: #f8fafc;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.95rem;
              color: #64748b;
              flex-shrink: 0;
              transition: all 0.25s ease;
            }
            .agri-course-card:hover .agri-course-arrow {
              transform: translateX(4px);
              color: #e65f1e;
              background: #fff7ed;
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
              padding: 8px 20px;
              font-size: 0.85rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              white-space: nowrap;
              display: inline-flex;
              align-items: center;
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
              padding: 8px 20px;
              font-size: 0.85rem;
              font-weight: 700;
              white-space: nowrap;
              display: inline-flex;
              align-items: center;
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
            .agri-info-card {
              background: #ffffff;
              border-radius: 10px;
              border: 1px solid #e2e8f0;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
              padding: 26px 30px;
              height: 100%;
            }
            .agri-info-title {
              font-size: 1.15rem;
              font-weight: 700;
              color: #1e293b;
              margin-bottom: 18px;
              padding-bottom: 14px;
              border-bottom: 2px solid #f1f5f9;
              display: flex;
              align-items: center;
            }
            .agri-title-icon-wrapper {
              width: 38px;
              height: 38px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 14px;
              font-size: 1.15rem;
              flex-shrink: 0;
            }
            .agri-criteria-box {
              background: #f8fafc;
              border-left: 4px solid #3b82f6;
              padding: 14px 18px;
              border-radius: 6px;
              font-size: 0.86rem;
              font-weight: 600;
              color: #334155;
              margin-bottom: 20px;
              line-height: 1.6;
            }
            .agri-badge-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
              border-radius: 8px;
              margin-bottom: 12px;
              background: #f8fafc;
              border: 1px solid #f1f5f9;
            }
            .agri-badge-score {
              font-weight: 700;
              color: #1e293b;
              font-size: 0.95rem;
            }
            .badge-item { display: inline-flex; align-items: center; font-weight: 700; padding: 6px 14px; border-radius: 20px; font-size: 0.84rem; }
            .badge-gold { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
            .badge-silver { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
            .badge-elite { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
            .badge-success { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
            .agri-formula-box {
              background: #fffbeb;
              border: 1px solid #fef3c7;
              border-radius: 8px;
              padding: 18px 20px;
              margin-bottom: 16px;
            }
            .agri-formula-title {
              font-size: 0.92rem;
              font-weight: 700;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
            }
            .agri-formula-text {
              font-size: 0.96rem;
              color: #78350f;
              font-weight: 600;
              margin-bottom: 0;
              line-height: 1.5;
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
                        <div className="agri-card-header">
                          <div>
                            <div className="agri-course-title">{course.code}</div>
                            <div className="agri-course-dept">{course.department}</div>
                          </div>
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
                                <i className="fa-solid fa-check me-2"></i> Enrolled
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

              {/* Side-by-Side Legend & Final Score Calculation Logic Panels */}
              <div className="row mt-5 g-4">
                {/* Left Side: Legend & Criteria */}
                <div className="col-lg-6">
                  <div className="agri-info-card">
                    <div className="agri-info-title">
                      <div className="agri-title-icon-wrapper" style={{ background: "#fff7ed", color: "#e65f1e" }}>
                        <i className="fa-solid fa-award"></i>
                      </div>
                      <span>Certificate Eligibility Criteria & Legend</span>
                    </div>

                    <div className="agri-criteria-box">
                      AVERAGE ASSIGNMENT SCORE &ge; 10/25 &nbsp;AND&nbsp; EXAM SCORE &ge; 30/75 &nbsp;AND&nbsp; FINAL SCORE &ge; 40
                    </div>

                    <p className="text-muted mb-3" style={{ fontSize: "0.88rem", fontWeight: "600" }}>
                      BASED ON THE FINAL SCORE, Certificate criteria will be as below:
                    </p>

                    <div className="agri-badge-row">
                      <span className="agri-badge-score">&ge; 90 Score</span>
                      <span className="badge-item badge-gold"><i className="fa-solid fa-crown" style={{ marginRight: "8px" }}></i> Elite + Gold</span>
                    </div>
                    <div className="agri-badge-row">
                      <span className="agri-badge-score">75 - 89 Score</span>
                      <span className="badge-item badge-silver"><i className="fa-solid fa-medal" style={{ marginRight: "8px" }}></i> Elite + Silver</span>
                    </div>
                    <div className="agri-badge-row">
                      <span className="agri-badge-score">&ge; 60 Score</span>
                      <span className="badge-item badge-elite"><i className="fa-solid fa-star" style={{ marginRight: "8px" }}></i> Elite</span>
                    </div>
                    <div className="agri-badge-row mb-0">
                      <span className="agri-badge-score">40 - 59 Score</span>
                      <span className="badge-item badge-success"><i className="fa-solid fa-check-circle" style={{ marginRight: "8px" }}></i> Successfully Completed</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Final Score Calculation Logic */}
                <div className="col-lg-6">
                  <div className="agri-info-card">
                    <div className="agri-info-title">
                      <div className="agri-title-icon-wrapper" style={{ background: "#eff6ff", color: "#3b82f6" }}>
                        <i className="fa-solid fa-calculator"></i>
                      </div>
                      <span>Final Score Calculation Logic</span>
                    </div>

                    <div className="agri-formula-box" style={{ background: "#f0fdf4", borderColor: "#dcfce7" }}>
                      <div className="agri-formula-title" style={{ color: "#166534" }}>
                        <i className="fa-solid fa-clipboard-check" style={{ marginRight: "10px", fontSize: "1.05rem" }}></i> Assignment Score Calculation
                      </div>
                      <p className="agri-formula-text" style={{ color: "#14532d" }}>
                        Assignment Score = Average of best 8 out of 12 assignments.
                      </p>
                    </div>

                    <div className="agri-formula-box" style={{ background: "#eff6ff", borderColor: "#dbeafe", marginBottom: 0 }}>
                      <div className="agri-formula-title" style={{ color: "#1e40af" }}>
                        <i className="fa-solid fa-percent" style={{ marginRight: "10px", fontSize: "1.05rem" }}></i> Final Certificate Score Formula
                      </div>
                      <p className="agri-formula-text" style={{ color: "#1e3a8a", fontSize: "1.02rem" }}>
                        FINAL SCORE (Score on Certificate) = <br />
                        <span style={{ fontWeight: "700", color: "#e65f1e" }}>75% of Exam Score</span> + <span style={{ fontWeight: "700", color: "#3b82f6" }}>25% of Assignment Score</span>.
                      </p>
                    </div>

                    {/* <div className="mt-4 pt-3 border-top d-flex align-items-center text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                      <i className="fa-solid fa-circle-info text-primary" style={{ marginRight: "10px", fontSize: "1.1rem", flexShrink: 0 }}></i>
                      <span>Note: Only students meeting minimum assignment and exam thresholds qualify for NPTEL / ICAR certificate.</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourses;
