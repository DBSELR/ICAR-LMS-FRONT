import React from 'react';

const statsData = [
    { id: 1, value: "10k+", label: "Learners Upskilled" },
    { id: 2, value: "50+", label: "Industry Partners" },
    { id: 3, value: "900+", label: "Students Placed" },
    { id: 4, value: "4.8/5", label: "Average Rating" }
];

const AboutSection = () => {
    return (
   <>
        <section className="gk-about-section">
            <div className="gk-about-container">

                <div className="gk-about-content">
                    <div className="gk-about-text">
                        <span className="gk-about-tagline">ABOUT US</span>
                        <h2 className="gk-about-title">Empowering Agricultural & Tech Professionals</h2>
                        <p className="gk-about-desc">
                            Ed Vedha is an premier <strong>professional learning platform</strong> dedicated to equipping learners, farmers, and entrepreneurs with modern scientific practices and practical skills. We specialize in comprehensive programs like <strong>Organic Farming</strong>, <strong>Mushroom Cultivation</strong>, <strong>Agri Drones</strong>, <strong>Drip Irrigation</strong>, and modern <strong>agritech training</strong> designed to drive real-world success.
                        </p>
                        <p className="gk-about-desc">
                            Our mission is to bridge traditional farming with cutting-edge technology. Through our interactive <strong>LMS platform</strong>, hands-on field projects, expert agronomist mentorship, and government-standard certification prep, we help learners build sustainable and high-yield agricultural careers across India and beyond.
                        </p>
                    </div>

                    <div className="gk-about-stats-grid">
                        {statsData.map((stat) => (
                            <div className="gk-stat-card" key={stat.id}>
                                <h3 className="gk-stat-value">{stat.value}</h3>
                                <p className="gk-stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
   </>

    );
};

export default AboutSection;