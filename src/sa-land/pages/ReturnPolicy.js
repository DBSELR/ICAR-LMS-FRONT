import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="rp-page">
            <div className="rp-container">

                {/* Header */}
                <header className="rp-header">
                    <h1>Refund, Return, Exchange & Cancellation Policy</h1>
                    <div className="rp-contact-info" style={{ marginTop: '15px', color: '#64748b' }}>
                        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', fontSize: '1.1rem' }}>
                            <span><i className="fa-solid fa-phone" style={{ marginRight: '8px', color: '#ea580c' }}></i> 8297222303</span>
                            <span><i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: '#ea580c' }}></i> support@edvedha.com</span>
                        </p>
                    </div>
                </header>

                <div className="rp-content-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>

                    {/* 1. Refund Policy */}
                    <div className="rp-section">
                        <h2 className="rp-section-title">Refund Policy</h2>
                        <div className="rp-card">
                            <div className="rp-sub-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                                    <h4 style={{ color: '#0f172a', marginBottom: '10px' }}> Eligibility & Timeframe</h4>
                                    <ul className="rp-check-list">
                                        <li>Refund requests must be raised within <strong>24–48 hours</strong> of purchase.</li>
                                        <li><strong>Allowed only if:</strong>
                                            <ul style={{ paddingLeft: '20px', marginTop: '5px', listStyleType: 'circle' }}>
                                                <li>Course access was not received.</li>
                                                <li>There is an unresolvable technical issue.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ color: '#0f172a', marginBottom: '10px' }}>No Refunds If</h4>
                                    <ul className="rp-cross-list">
                                        <li>Course content is accessed or downloaded.</li>
                                        <li>Change of mind or personal preference.</li>
                                        <li>Device/browser compatibility issues.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="rp-banner" style={{ marginTop: '20px', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                                <div className="rp-banner-text">
                                    <p style={{ color: '#15803d', margin: 0 }}><strong>Refund Process:</strong> Approved refunds are credited to the original payment method within <strong>5–7 business days</strong>.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Return Policy */}
                    <div className="rp-section">
                        <h2 className="rp-section-title">Return Policy</h2>
                        <div className="rp-banner">
                            <div className="rp-banner-icon">
                                <i className="fa-solid fa-ban"></i>
                            </div>
                            <div className="rp-banner-text">
                                <h3>Digital Products</h3>
                                <ul className="rp-cross-list" style={{ marginTop: '10px' }}>
                                    <li>All products are digital.</li>
                                    <li><strong>No returns</strong> allowed once access is provided.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 3. Exchange / Replacement Policy */}
                    <div className="rp-section">
                        <h2 className="rp-section-title">Exchange / Replacement Policy</h2>
                        <div className="rp-card">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                                <div>
                                    <div className="rp-card-header">
                                        <span className="rp-step-num">01</span>
                                        <h4>Allowed Cases</h4>
                                    </div>
                                    <ul className="rp-check-list">
                                        <li>Requests must be raised within <strong>1–2 days</strong> of purchase/access.</li>
                                        <li><strong>Wrong course access</strong> was provided.</li>
                                        <li>Course <strong>fails to activate</strong> and cannot be resolved.</li>
                                        <li>Verified requests are resolved within <strong>1–2 days</strong>.</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="rp-card-header">
                                        <span className="rp-step-num" style={{ background: '#ef4444' }}>02</span>
                                        <h4>Not Allowed</h4>
                                    </div>
                                    <ul className="rp-cross-list">
                                        <li>Course is accessed or modules are viewed.</li>
                                        <li>Change of preference or device issues.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Cancellation Policy */}
                    <div className="rp-section">
                        <h2 className="rp-section-title">Cancellation Policy</h2>
                        <div className="rp-card rp-highlight-box" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                            <ul className="rp-check-list">
                                <li>Cancellation requests must be raised within <strong>24 hours</strong> of purchase and <strong>before course access is activated</strong>.</li>
                                <li>Once course access is provided, cancellation is <strong>not allowed</strong>.</li>
                                <li>Eligible cancellations are credited within <strong>3–5 working days</strong> to the original payment method.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 5. How to Raise a Request */}
                    <div className="rp-section">
                        <h2 className="rp-section-title">How to Raise a Request</h2>
                        <div className="rp-card" style={{ textAlign: 'center', padding: '40px' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Email <strong>support@edvedha.com</strong> with:</p>
                            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                                {['Order ID', 'Registered Email/Phone', 'Brief Issue Description', 'Screenshots (if applicable)'].map(item => (
                                    <span key={item} style={{
                                        background: '#f1f5f9', padding: '10px 20px', borderRadius: '50px',
                                        fontSize: '0.95rem', fontWeight: '600', color: '#475569'
                                    }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <a href="mailto:support@edvedha.com" className="rp-support-btn">
                                    <i className="fa-regular fa-envelope"></i> Email Support
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;