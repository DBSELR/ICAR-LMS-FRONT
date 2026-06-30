import React from 'react';

const Banner = () => {
    return (
        <section className="banner-section">
            <div className="banner-container">
                {/* Left: Image */}
                <div className="banner-image">
                    <img src="../images/banner_student.png" alt="Students discussing" />
                </div>

                {/* Center: Text */}
                <div className="banner-content">
                    <h2>Can't Decide? Let Us Help You!</h2>
                </div>

                {/* Right: Button */}
                <div className="banner-action">
                    <a
                        href="https://wa.me/918297222303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="banner-btn"
                        style={{ textDecoration: 'none', display: 'inline-block' }}
                    >
                        Chat With Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Banner;
