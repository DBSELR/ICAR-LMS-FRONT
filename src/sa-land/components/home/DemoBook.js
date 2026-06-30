import React from 'react';

const DemoBook = () => {
    return (
        <section className="demo-book-section">
            <div className="demo-book-container">
                {/* Left Side: AI Features */}
                <div className="demo-content-wrapper">
                    
                    {/* Practical Field Training Section */}
                    <div className="demo-feature-card">
                        <div className="feature-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Practical Field & Tech Logs</h3>
                            <p className="feature-desc">Record crop cycles, track irrigation schedules, and log live soil nutrient analytics directly through our interactive LMS portal.</p>
                            <div className="lms-availability">
                                <span className="lms-dot"></span> Integrated in Edvedha LMS
                            </div>
                        </div>
                    </div>

                    {/* Mentorship & Certification Section */}
                    <div className="demo-feature-card">
                        <div className="feature-icon-wrapper purple-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Expert Mentorship & Certification</h3>
                            <p className="feature-desc">Get personalized guidance from professional agronomists and drone pilots, verified project reviews, and recognized certifications.</p>
                             <div className="lms-availability">
                                <span className="lms-dot"></span> Integrated in Edvedha LMS
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Side: Image */}
                <div className="demo-cert-img">
                    <img src="../images/certi.png" alt="Certificate of Completion" />
                </div>
            </div>
        </section>
    );
};

export default DemoBook;
