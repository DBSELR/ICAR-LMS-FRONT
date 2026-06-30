import React, { useState, useEffect } from 'react';
import './BookDemoPage.css';

// REPLACE THIS WITH YOUR NEW DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxDYHUhM-cWgPLXdgQwMpxK5f8iktR9SuqzUC3wDJItco0br902fypGN3EQcjPWQl78qA/exec";

const BookDemoPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        course: '',
        slot: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const courses = [
        { name: 'Graphic Designing', day: 0, time: '11:00 AM' }, // Sunday
        { name: 'Digital Marketing', day: 3, time: '07:00 PM' }, // Wednesday
    ];

    const getNextSlotDate = (dayOfWeek, timeStr) => {
        const now = new Date();
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        let targetDate = new Date();
        targetDate.setHours(hours, minutes, 0, 0);

        // Find the next occurrence of the day
        let daysUntil = (dayOfWeek - now.getDay() + 7) % 7;

        // If it's today but the time has passed, move to next week
        if (daysUntil === 0 && now > targetDate) {
            daysUntil = 7;
        }

        targetDate.setDate(now.getDate() + daysUntil);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return `${targetDate.toLocaleDateString(undefined, options)} at ${timeStr}`;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        let newFormData = { ...formData, [id]: value };

        if (id === 'course') {
            const selectedCourse = courses.find(c => c.name === value);
            if (selectedCourse) {
                newFormData.slot = getNextSlotDate(selectedCourse.day, selectedCourse.time);
            } else {
                newFormData.slot = '';
            }
        }

        setFormData(newFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const formattedMobile = formData.mobileNo.startsWith('+') ? `'${formData.mobileNo}` : `'+91 ${formData.mobileNo}`;
        const payload = { ...formData, mobileNo: formattedMobile, Source: 'Book Demo Page' };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify(payload),
            });

            setStatus('success');
            setFormData({ name: '', email: '', mobileNo: '', course: '', slot: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 8000);
        }
    };

    return (
        <div className="book-demo-container">
            <div className="book-demo-content">
                <div className="book-demo-header">
                    <span className="demo-badge">Book Your Free Demo</span>
                    <h1>Lock Your <span className="highlight">Success</span> Today</h1>
                    <p>Experience our expert-led sessions and see how we can transform your career.</p>
                </div>

                <div className="book-demo-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="input-group">
                                <label htmlFor="name">Full Name</label>
                                <div className="input-wrapper">
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="mobileNo">Phone Number</label>
                                <div className="input-wrapper">
                                    <i className="fa-solid fa-phone"></i>
                                    <input
                                        type="tel"
                                        id="mobileNo"
                                        placeholder="Enter your Mobile No."
                                        required
                                        pattern="[0-9]{10}"
                                        value={formData.mobileNo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="course">Course</label>
                                <div className="input-wrapper">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                    <select
                                        id="course"
                                        required
                                        value={formData.course}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select a course</option>
                                        {courses.map(c => (
                                            <option key={c.name} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <label htmlFor="slot">Slot Timing</label>
                                <div className="input-wrapper disabled">
                                    <i className="fa-solid fa-calendar-day"></i>
                                    <input
                                        type="text"
                                        id="slot"
                                        readOnly
                                        placeholder="Select a course to see next slot"
                                        value={formData.slot}
                                    />
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <label htmlFor="message">Any specific questions? (Optional)</label>
                                <div className="input-wrapper">
                                    <i className="fa-solid fa-message"></i>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        placeholder="Tell us what you're looking for..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${status === 'success' ? 'success' : ''}`}
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i> Processing...
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <i className="fa-solid fa-check"></i> Demo Booked!
                                </>
                            ) : (
                                <>
                                    Book My Demo Now <i className="fa-solid fa-arrow-right"></i>
                                </>
                            )}
                        </button>

                        {status === 'error' && (
                            <p className="error-msg">Ops! Something went wrong. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>

            {/* Background elements for rich aesthetics */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
            <div className="bg-grid"></div>
        </div>
    );
};

export default BookDemoPage;
