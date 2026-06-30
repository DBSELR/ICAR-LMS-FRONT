import React, { useState } from 'react';
import axios from 'axios';

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_a5vn38UKZDbmrqfmf4JoB3TKfmEsHiygriMznD2puIXefFn63cUMpH4n5kH2vrW1/exec";

const YoutubeContact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '', // Matching API key "mobileNo"
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Version Check Log
    console.log("YoutubeContact Loaded: v1.0");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const formattedMobile = formData.mobileNo.startsWith('+') ? `'${formData.mobileNo}` : `'+91 ${formData.mobileNo}`;
        const payload = { ...formData, mobileNo: formattedMobile, Source: 'Youtube' };
        console.log("Sending Payload:", payload); // Debugging log

        // Send to Google Sheets (Fire and forget)
        submitToGoogleSheets(payload);

        try {
            await axios.post('https://api.edvedha.in/api/BulkSms/mainleadsave', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            setStatus('success');
            setFormData({ name: '', email: '', mobileNo: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error("Youtube contact form submission failed details:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                // Formatting validation errors for display
                const validationErrors = Object.values(error.response.data.errors).flat().join(', ');
                console.error("Validation Errors:", validationErrors);
                setStatus(`Error: ${validationErrors}`);
            } else {
                setStatus('error');
            }
            setTimeout(() => setStatus('idle'), 8000);
        }
    };

    const submitToGoogleSheets = async (data) => {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Important: Google Apps Script Web App requires no-cors for simple POSTs
                headers: {
                    "Content-Type": "text/plain", // Avoids CORS preflight options request
                },
                body: JSON.stringify(data),
            });
            console.log("Submitted to Google Sheets");
        } catch (error) {
            console.error("Error submitting to Google Sheets:", error);
        }
    };

    return (
        <section className="gk-contact-section">

            {/* Header Section */}
            <div className="gk-contact-header">
                <h2 className="gk-header-title">Get in Touch</h2>
                <p className="gk-header-subtitle">
                    We’re here to help! If you have any questions, feedback, or need support regarding our courses and services, reach out to us anytime.
                </p>
            </div>

            <div className="gk-contact-container">
                <div className="gk-contact-wrapper gk-fade-up">

                    {/* Left Sidebar: Contact Info */}
                    <div className="gk-contact-info-box">
                        <h3 className="gk-info-title">Contact Information</h3>



                        <div className="gk-info-details">
                            {/* Phone Icon & Link */}
                            <a href="tel:+8297222303" className="gk-detail-item">
                                <div className="gk-icon-circle">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <span>+91-8297222303</span>
                            </a>

                            {/* Email Icon & Link */}
                            <a href="mailto:info@edvedha.in" className="gk-detail-item">
                                <div className="gk-icon-circle">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <span>info@edvedha.in</span>
                            </a>

                            {/* Address Icon & Text */}
                            <div className="gk-detail-item" style={{ alignItems: "flex-start" }}>
                                <div className="gk-icon-circle" style={{ marginTop: '5px' }}>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="gk-address-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                    {/* Eluru */}
                                    <div className="gk-branch-block">
                                        <h5 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#fff', fontWeight: '700' }}>Eluru</h5>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#fff', lineHeight: '1.6' }}>
                                            <strong>D BASE SOLUTIONS PVT LTD</strong><br />
                                            D.NO.16-58/33, Sai Sadan, Hanuman Nagar,<br />
                                            Eluru, AP– 534001, India
                                        </p>
                                    </div>

                                    {/* Vijayawada */}
                                    <div className="gk-branch-block">
                                        <h5 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#fff', fontWeight: '700' }}>Vijayawada</h5>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#fff', lineHeight: '1.6' }}>
                                            D.No 12-22, First Floor, Behind Alankar Bakery,<br />
                                            Enikepadu, Vijayawada - 521108
                                        </p>
                                    </div>

                                    {/* Hyderabad */}
                                    {/*<div className="gk-branch-block">
                                        <h5 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#fff', fontWeight: '700' }}>Hyderabad</h5>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#fff', lineHeight: '1.6' }}>
                                            Plot No. 13, Amar Co-operative Housing Society,<br />
                                            Madhapur, Hyderabad - 500081
                                        </p>
                                    </div>*/}

                                </div>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="gk-contact-socials" style={{ marginTop: '40px', marginBottom: '30px' }}>
                            <div className="gk-social-icons-row">
                                <a href="https://www.facebook.com/DbsEdvedha" target="_blank" rel="noopener noreferrer" className="gk-soc-link"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/dbs_edvedha/" target="_blank" rel="noopener noreferrer" className="gk-soc-link"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.linkedin.com/company/ed-vedha?trk=blended-typeahead" target="_blank" rel="noopener noreferrer" className="gk-soc-link"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>




                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="gk-contact-form-box">
                        <form onSubmit={handleSubmit}>
                            <div className="gk-form-grid">

                                {/* Name Input */}
                                <div className="gk-input-group">
                                    <label htmlFor="name">Your Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter Your Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="gk-input-group">
                                    <label htmlFor="email">Your Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Phone Input (Optional -> now mapped to mobileNo) */}
                            <div className="gk-input-group">
                                <label htmlFor="mobileNo">Mobile Number *</label>
                                <input
                                    type="tel"
                                    id="mobileNo"
                                    placeholder="Enter Your 10 digit Mobile Number"
                                    required
                                    pattern="[0-9]{10}"
                                    title="Please enter a valid 10 digit mobile number"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="gk-input-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    rows="11"
                                    placeholder="How can we help you?"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {/* Feedback messages */}
                            {status === 'error' && <p style={{ color: 'red', marginBottom: '10px' }}>Something went wrong. Please check your inputs.</p>}
                            {status.startsWith('Error:') && <p style={{ color: 'red', marginBottom: '10px' }}>{status}</p>}

                            {/* Submit Button with conditional state */}
                            <button
                                type="submit"
                                className={`gk-send-btn ${status === 'success' ? 'submitted' : ''}`}
                                disabled={status === 'loading' || status === 'success'}
                                style={{ display: 'flex', flexDirection: 'column', height: 'auto', padding: '12px 20px', gap: '4px' }}
                            >
                                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent! ✓' : (
                                    <>
                                        <span style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Barlow, sans-serif' }}>Only if you are serious - Fill the Form</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', fontFamily: 'Barlow, sans-serif' }}>Send message</span>
                                    </>
                                )}
                            </button>

                            {/* Scarcity Text Below Button */}
                            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginTop: '12px', fontWeight: '500', fontFamily: 'Barlow, sans-serif' }}>
                                <span style={{ color: '#ea580c', fontWeight: 'bold' }}>900+ Students Placed</span> | <span style={{ color: '#ef4444', fontWeight: 'bold' }}>only 30 seats left</span>
                            </p>
                        </form>
                    </div>

                    {/* <div className="gk-support-note" style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: "2rem", color: "#64748b" }}>
                        <p>Our support team at Edvedha will get back to you promptly during business hours.</p>
                    </div> */}

                </div>
            </div>
        </section>
    );
};

export default YoutubeContact;
