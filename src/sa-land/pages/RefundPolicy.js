import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="gk-refund-page">
            <div className="gk-refund-container">

                <h1 className="gk-refund-title">Refund Policy</h1>
                <p className="gk-refund-subtitle">
                    Since our products are digital and instantly accessible, we follow a strict refund policy to ensure fairness and transparency.
                </p>

                {/* Main Policy Content */}
                <div className="gk-refund-card">

                    {/* 1. Refund Request Window */}
                    <div className="gk-policy-section">
                        <div className="gk-policy-header">
                            <span className="gk-step-num">01</span>
                            <h3>Refund Request Window</h3>
                        </div>
                        <p>
                            Refund requests must be raised within <strong>24–48 hours of purchase</strong>. Requests after this window will not be eligible.
                        </p>
                    </div>

                    <div className="gk-divider"></div>

                    {/* 2. When Refunds Are Allowed */}
                    <div className="gk-policy-section">
                        <div className="gk-policy-header">
                            <span className="gk-step-num">02</span>
                            <h3>When Refunds Are Allowed</h3>
                        </div>
                        <ul className="gk-policy-list-check">
                            <li>
                                <strong>No access received:</strong> You did not receive access to the course/product after successful payment.
                            </li>
                            <li>
                                <strong>Unresolvable technical issue:</strong> A technical problem prevents usage and cannot be reasonably resolved by our team.
                            </li>
                        </ul>
                        <div className="gk-info-note">
                            <i className="fa-solid fa-circle-info"></i>
                            <p>We may request screenshots, error messages, or transaction details to validate the issue and speed up resolution.</p>
                        </div>
                    </div>

                    <div className="gk-divider"></div>

                    {/* 3. When Refunds Aren’t Possible */}
                    <div className="gk-policy-section">
                        <div className="gk-policy-header">
                            <span className="gk-step-num">03</span>
                            <h3>When Refunds Aren’t Possible</h3>
                        </div>
                        <ul className="gk-policy-list-cross">
                            <li>
                                <strong>Content accessed or downloaded:</strong> Once you have accessed/downloaded course content (videos, PDFs, or materials), refunds will not be provided.
                            </li>
                            <li>
                                <strong>Change of mind / preferences:</strong> Refunds are not issued for personal preference changes.
                            </li>
                            <li>
                                <strong>Device/compatibility limitations:</strong> If your device/browser does not meet minimum requirements.
                            </li>
                        </ul>
                        <p className="gk-small-text">We provide demos, previews, and detailed descriptions to help you evaluate before purchase.</p>
                    </div>

                    <div className="gk-divider"></div>

                    {/* 4. How to Request a Refund & 5. Timeline */}
                    <div className="gk-grid-2-col-policy">
                        {/* 4. Request Process */}
                        <div className="gk-policy-box">
                            <h4>4. How to Request a Refund</h4>
                            <p>Email us at <a href="mailto:support@edvedha.com">support@edvedha.com</a> within the 24–48 hour window:</p>
                            <ul>
                                <li>Include your order ID, registered email/phone, and a brief description of the issue.</li>
                                <li>Attach relevant screenshots or error messages if it’s a technical problem.</li>
                            </ul>
                            <p className="gk-sub-note">Our team will review and respond with the next steps. If resolvable, we may first attempt to fix access or technical problems.</p>
                        </div>

                        {/* 5. Timeline */}
                        <div className="gk-policy-box gk-box-highlight">
                            <h4>5. Processing Timeline & Method</h4>
                            <p>
                                Approved refunds are processed to the original payment method within <strong>5–7 business days</strong>.
                            </p>
                            <p>Your bank/payment provider may take additional time to reflect the credit.</p>
                        </div>
                    </div>

                </div>

                {/* Footer / Contact */}
                <div className="gk-refund-footer">
                    <p>Have questions regarding our policy?</p>
                    <a href="mailto:support@edvedha.com" className="gk-contact-link">
                        Contact Support <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default RefundPolicy;