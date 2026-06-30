import React from 'react';

const CancellationPolicy = () => {
    return (
        <div className="gk-cancel-page">
            <div className="gk-cancel-container">

                {/* Header */}
                <div className="gk-cancel-header">
                    <h1>Cancellation Policy</h1>
                    <p>Please review our terms regarding cancellation and refunds.</p>
                </div>

                {/* Main Policy Content */}
                <div className="gk-cancel-card">

                    {/* 1. When You Can Cancel */}
                    <div className="gk-cancel-section">
                        <div className="gk-cancel-header-row">
                            <span className="gk-cancel-step-num">01</span>
                            <h3>When You Can Cancel</h3>
                        </div>
                        <ul className="gk-cancel-list-check">
                            <li>Orders can only be cancelled <strong>before course access is activated</strong>.</li>
                            <li>If you haven’t received any access email/login/dashboard activation, your order is usually eligible.</li>
                        </ul>
                    </div>

                    <div className="gk-divider"></div>

                    {/* 2. When Cancellation Isn’t Allowed */}
                    <div className="gk-cancel-section">
                        <div className="gk-cancel-header-row">
                            <span className="gk-cancel-step-num">02</span>
                            <h3>When Cancellation Isn’t Allowed</h3>
                        </div>
                        <ul className="gk-cancel-list-cross">
                            <li>If access is already provided (email/login/dashboard), cancellation cannot be processed.</li>
                            <li>If any course content has been accessed or viewed, cancellation cannot be processed.</li>
                        </ul>
                    </div>

                    <div className="gk-divider"></div>

                    {/* 3. Refunds for Eligible Cancellations */}
                    <div className="gk-cancel-section">
                        <div className="gk-cancel-header-row">
                            <span className="gk-cancel-step-num">03</span>
                            <h3>Refunds for Eligible Cancellations</h3>
                        </div>
                        <p className="gk-cancel-text">
                            Refunds are processed to the original payment method.
                            <br />
                            <strong>Timeline:</strong> 3–5 working days after approval (bank/processor timelines may vary).
                        </p>
                    </div>

                    <div className="gk-divider"></div>

                    {/* 4. How to Request & 5. Processing Timeline */}
                    <div className="gk-cancel-grid-2">
                        {/* 4. Request Process */}
                        <div className="gk-cancel-box">
                            <h4>4. How to Request Cancellation</h4>
                            <p>Email <a href="mailto:support@edvedha.com">support@edvedha.com</a> from your registered email:</p>
                            <ul>
                                <li>Include order ID, registered email/phone, and a brief reason for cancellation.</li>
                                <li>Attach email/SMS screenshots for faster verification if applicable.</li>
                            </ul>
                        </div>

                        {/* 5. Timeline */}
                        <div className="gk-cancel-box gk-cancel-highlight">
                            <h4>5. Processing Timeline</h4>
                            <p>
                                Requests are reviewed for eligibility. Approved cancellations are refunded within <strong>3–5 working days</strong> to your original payment method.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="gk-cancel-footer">
                    <p>Have questions regarding cancellation?</p>
                    <a href="mailto:support@edvedha.com" className="gk-help-link">
                        Contact Support
                    </a>
                </div>

            </div>
        </div>
    );
};

export default CancellationPolicy;