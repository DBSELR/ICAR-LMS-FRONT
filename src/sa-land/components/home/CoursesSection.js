import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { coursesData, categories } from '../../pages/courses/coursesData';

const CoursesSection = () => {
    const [mainTab, setMainTab] = useState("Trending");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSlab, setActiveSlab] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const recommendedTitles = [
        "Organic Farming Professional Program",
        "Drones in Indian Agriculture Professional Program",
        "Mushroom Cultivation Professional Program",
        "Drip Irrigation Professional Program"
    ];

    // Set active tab from navigation state if available
    useEffect(() => {
        if (location.state && (location.state.category || location.state.title)) {
            if (location.state.title && recommendedTitles.includes(location.state.title)) {
                setMainTab("Trending");
            } else {
                setMainTab("Upcoming");
                setActiveCategory(location.state.category || "All");
            }

            // Scroll to the section after a robust delay to ensure full rendering
            setTimeout(() => {
                const section = document.getElementById('courses1') || document.getElementById('courses');
                if (section) {
                    const yOffset = -100; // Adjust for any sticky header
                    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
        }
    }, [location.state]);

    // Animate slabs continuously
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlab((prev) => (prev < 2 ? prev + 1 : 0));
        }, 2000); // Allow time for 1.5s line animation + pause
        return () => clearInterval(interval);
    }, []);

    const visibleCourses = coursesData;
    let filteredCourses = [];

    if (mainTab === "Trending") {
        filteredCourses = visibleCourses
            .filter(course => recommendedTitles.includes(course.title))
            .sort((a, b) => recommendedTitles.indexOf(a.title) - recommendedTitles.indexOf(b.title));
    } else {
        if (activeCategory === "All") {
            filteredCourses = visibleCourses;
        } else {
            filteredCourses = visibleCourses.filter(course => course.category === activeCategory);
        }
    }

    return (
        <section className="gk-courses-section" id="courses">
            <div className="gk-container">
                <div className="gk-section-header">
                    <span className="gk-subtitle">Upgrade Your Skills</span>
                    <h2 className="gk-title">Explore Our Professional Programs</h2>
                    <div className="gk-underline"></div>
                </div>

                {/* Main Tabs (Trending vs All Programs) */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: mainTab === 'Trending' ? '2.5rem' : '1.5rem', marginTop: '1rem' }}>
                    <button
                        className={`gk-tab-btn ${mainTab === "Trending" ? 'active' : ''}`}
                        onClick={() => setMainTab("Trending")}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: mainTab === "Trending" ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' : '#f1f5f9',
                            color: mainTab === "Trending" ? '#fff' : '#64748b',
                            border: mainTab === "Trending" ? '1px solid #ea580c' : '1px solid #e2e8f0',
                            fontWeight: '700',
                            padding: '12px 28px',
                            boxShadow: mainTab === "Trending" ? '0 4px 15px rgba(234, 88, 12, 0.3)' : 'none',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <i className="fa-solid fa-fire"></i>
                        Trending Programs
                    </button>

                    <button
                        className={`gk-tab-btn ${mainTab === "Upcoming" ? 'active' : ''}`}
                        onClick={() => setMainTab("Upcoming")}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: mainTab === "Upcoming" ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : '#f1f5f9',
                            color: mainTab === "Upcoming" ? '#fff' : '#64748b',
                            border: mainTab === "Upcoming" ? '1px solid #0f172a' : '1px solid #e2e8f0',
                            fontWeight: '700',
                            padding: '12px 28px',
                            boxShadow: mainTab === "Upcoming" ? '0 4px 15px rgba(15, 23, 42, 0.3)' : 'none',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <i className="fa-solid fa-layer-group"></i>
                        All Programs
                    </button>
                </div>

                {/* Category Tabs (Rendered only on All Programs) */}
                {mainTab === "Upcoming" && categories.length > 1 && (
                    <div className="gk-tabs-container" style={{ marginBottom: '2rem' }}>
                        <button
                            className={`gk-tab-btn ${activeCategory === "All" ? 'active' : ''}`}
                            onClick={() => setActiveCategory("All")}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                        >
                            All Categories
                        </button>
                        {categories.map((cat) => {
                            const count = visibleCourses.filter(course => course.category === cat).length;
                            if (count === 0) return null;

                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    className={`gk-tab-btn ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                                >
                                    {cat}
                                    <span style={{
                                        backgroundColor: isActive ? '#ea580c' : '#f1f5f9',
                                        color: isActive ? '#ffffff' : '#64748b',
                                        borderRadius: '50%',
                                        width: '18px',
                                        height: '18px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        lineHeight: '0',
                                        border: isActive ? 'none' : '1px solid #e2e8f0'
                                    }}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                <div className={`gk-courses-grid ${filteredCourses.length <= 3 ? 'centered-grid-3' : ''}`}>
                    {filteredCourses.map((course) => (
                        <div className="gk-course-card" key={course.id}>
                            <div className={`gk-card-banner-new ${recommendedTitles.includes(course.title) ? 'gk-card-banner-trending' : ''}`}>
                                <img src={course.image} alt={course.title} />
                            </div>

                            <div className="gk-card-content-new">
                                <h3 className="gk-course-title-new">{course.title}</h3>

                                <div className="gk-course-meta-new">
                                    <div className="gk-meta-col-new">
                                        <span className="gk-meta-label-new">Duration:</span>
                                        <span className="gk-meta-value-new">{course.duration}</span>
                                    </div>
                                    <div className="gk-meta-col-new">
                                        <span className="gk-meta-label-new">Best For:</span>
                                        <span className="gk-meta-value-new">{course.role}</span>
                                    </div>
                                </div>

                                <div className="gk-course-action-new">
                                    <button
                                        className="gk-view-program-btn-new"
                                        style={{ fontFamily: 'inherit' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            let ref = searchParams.get("ref");
                                            if (!ref) {
                                                const windowParams = new URLSearchParams(window.location.search);
                                                ref = windowParams.get("ref");
                                            }

                                            if (ref) {
                                                axios.post(`https://api.edvedha.in/api/BulkSms/hotleadsave?ref=${encodeURIComponent(ref)}&course=${encodeURIComponent(course.title)}`, {})
                                                    .then(() => console.log(`Hot lead captured for ${course.title}`))
                                                    .catch(err => console.error("Hot lead tracking failed", err))
                                                    .finally(() => {
                                                        navigate(course.seoPath ? `/${course.seoPath}` : `/course/${course.id}`);
                                                    });
                                            } else {
                                                navigate(course.seoPath ? `/${course.seoPath}` : `/course/${course.id}`);
                                            }
                                        }}
                                    >
                                        Explore Course
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;