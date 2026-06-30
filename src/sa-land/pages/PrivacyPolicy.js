import React, { useState } from 'react';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('intro');

    // smooth scroll handler
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    const sections = [
        { id: 'intro', label: '1. Introduction' },
        { id: 'collect', label: '2. Information We Collect' },
        { id: 'use', label: '3. How We Use Information' },
        { id: 'share', label: '4. Sharing Your Information' },
        { id: 'cookies', label: '5. Cookies & Tracking' },
        { id: 'security', label: '6. Data Security' },
        { id: 'retention', label: '7. Retention' },
        { id: 'rights', label: '8. Your Rights' },
        { id: 'links', label: '9. Third-Party Links' },
        { id: 'children', label: '10. Children’s Privacy' },
        { id: 'updates', label: '11. Updates' },
        { id: 'contact', label: '12. Contact Us' },
    ];

    return (
        <div className="gk-privacy-page">

            {/* Page Header */}
            <header className="gk-privacy-header">
                <div className="gk-container">
                    <h1 className="gk-page-title">Privacy Policy</h1>
                    <p className="gk-page-subtitle">
                        <strong>Effective Date:</strong> 12/07/2024<br />
                        <strong>Website:</strong> https://edvedha.in/
                    </p>
                    <div className="gk-meta-row" style={{ marginTop: '1rem', color: '#cbd5e1' }}>
                        <p><strong>Owned and Operated By:</strong><br />
                            D BASE SOLUTIONS PRIVATE LIMITED<br />
                            D.NO.16-58/33, Sai Sadan, Sri Sairam Nagar,<br />
                            Hanuman Nagar, Eluru, West Godavari,<br />
                            Andhra Pradesh – 534001, India
                        </p>
                        <p style={{ marginTop: '0.5rem' }}>
                            📞 8297222303 &nbsp; | &nbsp; 📧 edvedha@dbasesolutions.in
                        </p>
                    </div>
                </div>
            </header>

            <div className="gk-container gk-content-grid">

                {/* Sidebar Navigation (Sticky) */}
                <aside className="gk-privacy-sidebar">
                    <nav className="gk-toc">
                        <h3 className="gk-toc-title">Table of Contents</h3>
                        <ul>
                            {sections.map((item) => (
                                <li key={item.id}>
                                    <button
                                        className={`gk-toc-link ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="gk-privacy-content">

                    {/* 1. Introduction */}
                    <section id="intro" className="gk-policy-section">
                        <h2 className="gk-section-title">1. Introduction</h2>
                        <p>
                            Your privacy is important to us. This Privacy Policy explains how D BASE SOLUTIONS PRIVATE LIMITED collects, uses, stores, and protects your personal information when you access or use https://edvedha.in/ (“Website”) and related services (“Services”).
                        </p>
                        <p>By using the Website, you consent to the practices described in this Privacy Policy.</p>
                    </section>

                    {/* 2. Information We Collect */}
                    <section id="collect" className="gk-policy-section">
                        <h2 className="gk-section-title">2. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>

                        <div className="gk-info-grid">
                            <div className="gk-info-card">
                                <h4>a. Personal Information</h4>
                                <ul>
                                    <li>Name, email address, phone number</li>
                                    <li>Payment details (processed securely via third-party gateways)</li>
                                    <li>Account login credentials</li>
                                </ul>
                            </div>
                            <div className="gk-info-card">
                                <h4>b. Non-Personal Information</h4>
                                <ul>
                                    <li>IP address, device type, browser type</li>
                                    <li>Pages visited, time spent on the Website</li>
                                    <li>Cookies and usage patterns</li>
                                </ul>
                            </div>
                            <div className="gk-info-card">
                                <h4>c. User-Generated Content</h4>
                                <ul>
                                    <li>Messages, feedback, course submissions, or reviews you post</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. How We Use Information */}
                    <section id="use" className="gk-policy-section">
                        <h2 className="gk-section-title">3. How We Use Your Information</h2>
                        <p>We use your information for:</p>
                        <ul className="gk-check-list">
                            <li>Providing and improving our Services</li>
                            <li>Processing payments and delivering purchased courses</li>
                            <li>Sending important updates, offers, or announcements</li>
                            <li>Responding to support requests</li>
                            <li>Analyzing user behavior to improve the Website experience</li>
                            <li>Ensuring legal and regulatory compliance</li>
                        </ul>
                    </section>

                    {/* 4. Sharing Information */}
                    <section id="share" className="gk-policy-section">
                        <h2 className="gk-section-title">4. Sharing Your Information</h2>
                        <p>We do not sell, trade, or rent your personal information. Information may be shared only:</p>
                        <ul className="gk-simple-list">
                            <li>With third-party service providers (payment gateways, hosting services) to deliver Services</li>
                            <li>When required by law or to protect our rights</li>
                            <li>In connection with a business transfer, merger, or acquisition</li>
                        </ul>
                    </section>

                    {/* 5. Cookies */}
                    <section id="cookies" className="gk-policy-section">
                        <h2 className="gk-section-title">5. Cookies and Tracking Technologies</h2>
                        <p>We use cookies and similar technologies to:</p>
                        <ul className="gk-bullet-list">
                            <li>Enhance Website functionality</li>
                            <li>Analyze trends and usage patterns</li>
                            <li>Personalize content and offers</li>
                        </ul>
                        <p>You can disable cookies in your browser settings, but some features of the Website may not function properly.</p>
                    </section>

                    {/* 6. Data Security */}
                    <section id="security" className="gk-policy-section">
                        <h2 className="gk-section-title">6. Data Security</h2>
                        <p>
                            We implement reasonable administrative, technical, and physical measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* 7. Retention */}
                    <section id="retention" className="gk-policy-section">
                        <h2 className="gk-section-title">7. Retention of Information</h2>
                        <p>
                            We retain your personal information only as long as necessary to provide Services, comply with legal obligations, resolve disputes, and enforce our agreements.
                        </p>
                    </section>

                    {/* 8. Your Rights */}
                    <section id="rights" className="gk-policy-section">
                        <h2 className="gk-section-title">8. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="gk-check-list">
                            <li>Access the personal information we hold about you</li>
                            <li>Request corrections or updates to your information</li>
                            <li>Request deletion of your personal information, subject to legal or contractual restrictions</li>
                        </ul>
                        <p style={{ marginTop: '1rem' }}>To exercise these rights, please contact us at <a href="mailto:Support@edvedha.com">Support@edvedha.com</a>.</p>
                    </section>

                    {/* 9. Third-Party Links */}
                    <section id="links" className="gk-policy-section">
                        <h2 className="gk-section-title">9. Third-Party Links</h2>
                        <p>
                            Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. Please review their privacy policies before providing any personal information.
                        </p>
                    </section>

                    {/* 10. Children */}
                    <section id="children" className="gk-policy-section">
                        <h2 className="gk-section-title">10. Children’s Privacy</h2>
                        <p>
                            Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of any such data, we will delete it promptly.
                        </p>
                    </section>

                    {/* 11. Updates */}
                    <section id="updates" className="gk-policy-section">
                        <h2 className="gk-section-title">11. Updates to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. All updates will be posted on this page with a revised Effective Date. Your continued use of the Website constitutes acceptance of the updated Privacy Policy.
                        </p>
                    </section>

                    {/* 12. Contact Us */}
                    <section id="contact" className="gk-policy-section gk-contact-sections">
                        <h2 className="gk-section-title">12. Contact Us</h2>
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy:</p>
                        <div className="gk-warning-card" style={{ background: '#f8fafc', borderLeftColor: '#334155' }}>
                            <p style={{ color: '#0f172a', fontWeight: 'bold' }}>D BASE SOLUTIONS PRIVATE LIMITED</p>
                            <p style={{ margin: '0.5rem 0' }}>
                                📍 Address: D.NO.16-58/33, Sai Sadan, Sri Sairam Nagar, Hanuman Nagar, Eluru, West Godavari, Andhra Pradesh – 534001, India
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

export default PrivacyPolicy;