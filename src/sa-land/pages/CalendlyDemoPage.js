import React, { useEffect } from 'react';
import './CalendlyDemoPage.css';

const CalendlyDemoPage = () => {
    useEffect(() => {
        // Dynamically load the Calendly widget script so it correctly
        // initializes the inline widgets within this React component upon mount.
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="calendly-demo-container">
            <div className="calendly-demo-content">
                <div className="calendly-demo-header">
                    <span className="demo-badge">Book Your Free Demo</span>
                    <h1>Lock Your <span className="highlight">Success</span> Today</h1>
                    <p>Choose the demo that aligns with your career goals and speak directly with our experts.</p>
                </div>

                <div className="calendly-widgets-wrapper">
                    {/* Other Courses Demo */}
                    <div className="calendly-widget-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <div className="widget-title-area">
                            <h2>Book Your Free Demo</h2>
                            <p>Check our availability and schedule a live session with our experts.</p>
                        </div>
                        <div
                            className="calendly-inline-widget"
                            data-url="https://calendly.com/d/cvdt-zg5-dxb?hide_gdpr_banner=1&background_color=ffffff&primary_color=ea580c"
                            style={{ minWidth: '320px', height: '650px' }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Background elements for rich aesthetics matching BookDemoPage */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
            <div className="bg-grid"></div>
        </div>
    );
};

export default CalendlyDemoPage;
