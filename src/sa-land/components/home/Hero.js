import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { coursesData as allCourses } from "../../pages/courses/coursesData";

const Hero = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const visibleCourses = allCourses;

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % visibleCourses.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [visibleCourses.length]);

    // Safe index access to prevent crashes on hot-reload or data changes
    const safeIndex = index % visibleCourses.length;
    const current = visibleCourses[safeIndex] || visibleCourses[0];

    return (
        <section className="hero-container" id="home">
            <div className="hero-bg-grid"></div>

            <div className="hero-content">
                {/* LEFT CONTENT */}
                <div className="hero-text">
                    <span className="badge">🌱 Ed Vedha Professional Programs</span>

                    <div key={index} className="animate-text">
                        <h1>{current.title}</h1>

                        <p>{current.description}</p>

                        {/* META INFO */}
                        <div className="hero-meta">
                            <span className="meta-pill">
                                <i className="fa-solid fa-layer-group"></i> {current.category}
                            </span>
                            <span className="meta-pill">
                                <i className="fa-solid fa-clock"></i> {current.duration}
                            </span>
                        </div>
                    </div>

                    <div className="cta-group">
                        <button
                            className="btn-primary"
                            onClick={() => {
                                navigate(`/course/${current.id}`);
                                window.scrollTo(0, 0);
                            }}
                        >
                            Explore Course <i className="fa-solid fa-arrow-right"></i>
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={() => {
                                navigate("/courses");
                                window.scrollTo(0, 0);
                            }}
                        >
                            <span>All Programs</span> <i className="fa-solid fa-grid-2"></i>
                        </button>
                    </div>
                </div>

                {/* RIGHT VISUAL */}
                <div className="hero-visual">
                    <div className="card-stack">
                        <div className="card-layer layer-0"></div>
                        <div className="card-layer layer-1"></div>
                        <div className="card-layer layer-2"></div>

                        <div className="card-layer layer-3" key={index}>
                            <span className="card-text">{current.role}</span>
                        </div>

                        <div className="card-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

