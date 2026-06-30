import React, { useState } from 'react';

const TermsConditions = () => {
    const [activeSection, setActiveSection] = useState('acceptance');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    const sections = [
        { id: 'acceptance', label: '1. Acceptance of Terms' },
        { id: 'eligibility', label: '2. Eligibility' },
        { id: 'services', label: '3. Services' },
        { id: 'account', label: '4. User Account' },
        { id: 'fees', label: '5. Fees and Payments' },
        { id: 'refund', label: '6. Refund Policy' },
        { id: 'ip', label: '7. Intellectual Property' },
        { id: 'conduct', label: '8. User Conduct' },
        { id: 'disclaimer', label: '9. Disclaimer' },
        { id: 'liability', label: '10. Limitation of Liability' },
        { id: 'indemnification', label: '11. Indemnification' },
        { id: 'law', label: '12. Governing Law' },
        { id: 'changes', label: '13. Changes to Terms' },
        { id: 'contact', label: '14. Contact Us' },
    ];

    return (
        <div className="gk-terms-page">

            {/* Header */}
            <header className="gk-terms-header">
                <div className="gk-container">
                    <h1 className="gk-page-title">Terms & Conditions</h1>
                    <p className="gk-page-subtitle">
                        <strong>Effective Date:</strong> 12/07/2024<br />
                        <strong>Website:</strong> https://edvedha.in/
                    </p>
                    <div className="gk-meta-row" style={{ marginTop: '1rem', color: '#64748b' }}>
                        <p><strong>Owned and Operated By:</strong><br />
                            D BASE SOLUTIONS PRIVATE LIMITED<br />
                            D.NO.16-58/33, Sai Sadan, Sri Sairam Nagar,<br />
                            Hanuman Nagar, Eluru, West Godavari,<br />
                            Andhra Pradesh – 534001, India
                        </p>
                    </div>
                </div>
            </header>

            <div className="gk-container gk-content-grid">

                {/* Sticky Sidebar Navigation */}
                <aside className="gk-terms-sidebar">
                    <nav className="gk-toc">
                        <h3 className="gk-toc-header">Contents</h3>
                        <ul>
                            {sections.map((item) => (
                                <li key={item.id}>
                                    <button
                                        className={`gk-toc-btn ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="gk-terms-content">

                    {/* 1. Acceptance */}
                    <section id="acceptance" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">01</span>
                            <h2>Acceptance of Terms</h2>
                        </div>
                        <p>
                            By accessing or using the website https://edvedha.in (“Website”), you agree to comply with and be bound by these Terms and Conditions (“Terms”). If you do not agree with these Terms, please do not use the Website or services.
                        </p>
                    </section>

                    {/* 2. Eligibility */}
                    <section id="eligibility" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">02</span>
                            <h2>Eligibility</h2>
                        </div>
                        <p>
                            You must be at least 18 years old to use this Website and its services. By using the Website, you confirm that you are legally capable of entering into a binding agreement under Indian law.
                        </p>
                    </section>

                    {/* 3. Services */}
                    <section id="services" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">03</span>
                            <h2>Services</h2>
                        </div>
                        <p>
                            Edvedha provides online education, skill development programs, training courses, learning materials, and related services (“Services”). The Company reserves the right to update, modify, or discontinue any Service without prior notice.
                        </p>
                    </section>

                    {/* 4. User Account */}
                    <section id="account" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">04</span>
                            <h2>User Account</h2>
                        </div>
                        <ul className="gk-bullet-list">
                            <li>Certain features may require account registration.</li>
                            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                            <li>The Company is not responsible for any loss resulting from unauthorized use of your account.</li>
                        </ul>
                    </section>

                    {/* 5. Fees and Payments */}
                    <section id="fees" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">05</span>
                            <h2>Fees and Payments</h2>
                        </div>
                        <ul className="gk-bullet-list">
                            <li>Some courses or services may be paid.</li>
                            <li>All fees are listed in Indian Rupees (INR) unless otherwise stated.</li>
                            <li>Payments are processed through secure third-party payment gateways.</li>
                            <li>The Company does not store or retain payment card or banking details.</li>
                        </ul>
                    </section>

                    {/* 6. Refund and Cancellation Policy */}
                    <section id="refund" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">06</span>
                            <h2>Refund and Cancellation Policy</h2>
                        </div>
                        <p>
                            Refunds and cancellations are governed by the Refund Policy available on the Website. By purchasing any paid service, you agree to the applicable refund terms.
                        </p>
                    </section>

                    {/* 7. Intellectual Property Rights */}
                    <section id="ip" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">07</span>
                            <h2>Intellectual Property Rights</h2>
                        </div>
                        <p>
                            All content on this Website, including but not limited to course materials, videos, text, images, graphics, logos, trademarks, and software, is the intellectual property of D BASE SOLUTIONS PRIVATE LIMITED.<br />
                            Unauthorized reproduction, distribution, resale, or commercial use is strictly prohibited.
                        </p>
                    </section>

                    {/* 8. User Conduct */}
                    <section id="conduct" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">08</span>
                            <h2>User Conduct</h2>
                        </div>
                        <p>You agree not to:</p>
                        <ul className="gk-check-list">
                            <li>Use the Website for unlawful purposes.</li>
                            <li>Share, copy, or distribute content without permission.</li>
                            <li>Upload harmful, misleading, or offensive content.</li>
                            <li>Attempt unauthorized access to systems or data.</li>
                            <li>Violate any applicable laws or regulations.</li>
                        </ul>
                    </section>

                    {/* 9. Disclaimer */}
                    <section id="disclaimer" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">09</span>
                            <h2>Disclaimer</h2>
                        </div>
                        <ul className="gk-bullet-list">
                            <li>All Services are provided on an “as is” and “as available” basis.</li>
                            <li>The Company does not guarantee job placement, income generation, certifications, or specific learning outcomes.</li>
                            <li>Technical issues, third-party failures, or internet disruptions are beyond the Company’s control.</li>
                        </ul>
                    </section>

                    {/* 10. Limitation of Liability */}
                    <section id="liability" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">10</span>
                            <h2>Limitation of Liability</h2>
                        </div>
                        <p>
                            To the maximum extent permitted by law, D BASE SOLUTIONS PRIVATE LIMITED shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the Website or Services.
                        </p>
                    </section>

                    {/* 11. Indemnification */}
                    <section id="indemnification" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">11</span>
                            <h2>Indemnification</h2>
                        </div>
                        <p>
                            You agree to indemnify and hold harmless the Company, its directors, employees, partners, and affiliates from any claims, losses, damages, or expenses arising from your violation of these Terms or misuse of the Services.
                        </p>
                    </section>

                    {/* 12. Governing Law and Jurisdiction */}
                    <section id="law" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">12</span>
                            <h2>Governing Law and Jurisdiction</h2>
                        </div>
                        <p>
                            These Terms shall be governed by and interpreted in accordance with the laws of India.<br />
                            All disputes shall be subject to the exclusive jurisdiction of the courts in Andhra Pradesh, India.
                        </p>
                    </section>

                    {/* 13. Changes to Terms */}
                    <section id="changes" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">13</span>
                            <h2>Changes to Terms</h2>
                        </div>
                        <p>
                            The Company reserves the right to update or modify these Terms at any time. Continued use of the Website after changes are posted constitutes acceptance of the revised Terms.
                        </p>
                    </section>

                    {/* 14. Contact Us */}
                    <section id="contact" className="gk-term-section">
                        <div className="gk-sec-header">
                            <span className="gk-sec-num">14</span>
                            <h2>Contact Us</h2>
                        </div>
                        <p>For any questions, support, or concerns regarding these Terms, please contact:</p>
                        <div className="gk-warning-card" style={{ background: '#f8fafc', borderLeftColor: '#334155' }}>
                            <p style={{ color: '#0f172a', fontWeight: 'bold' }}>D BASE SOLUTIONS PRIVATE LIMITED</p>
                            <p style={{ margin: '0.5rem 0' }}>
                                📍 Address: D.NO.16-58/33, Sai Sadan, Sri Sairam Nagar, Hanumannagar, Eluru, West Godavari, Andhra Pradesh – 534001, India
                            </p>
                            <p style={{ margin: '0.5rem 0' }}>📞 Phone: 8297222303</p>
                            <p style={{ margin: '0.5rem 0' }}>📧 Email: edvedha@dbasesolutions.in</p>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default TermsConditions;