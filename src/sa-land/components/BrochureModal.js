import React, { useState, useEffect } from 'react';

// GOOGLE APPS SCRIPT WEB APP URL (Updated by User)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbznrcriDES_f2HsTK-Y5r4CRKgH-1U0M7RcK18EzzZFWZySZIwoz5bkXtznfVAY-NV8/exec";

const BrochureModal = ({ isOpen, courseTitle, onDownload, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        whatsappNumber: '',
        location: '',
        decisionMaker: 'Myself',
        joinTiming: 'Immediately',
        currentStatus: 'Student',
        hasLaptop: 'Yes',
        modeOfLearning: 'Online'
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(1);
            setStatus('idle');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = (e) => {
        if (e) e.preventDefault();
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const formattedWhatsapp = formData.whatsappNumber.startsWith('+') 
            ? formData.whatsappNumber 
            : `+91 ${formData.whatsappNumber}`;

        const payload = {
            ...formData,
            whatsappNumber: formattedWhatsapp,
            course: courseTitle,
            submittedAt: new Date().toLocaleString(),
            source: 'Curriculum Download Popup'
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify(payload),
            });

            setStatus('success');
            setTimeout(() => { onDownload(); }, 800);
            setTimeout(() => {
                onClose();
                setFormData({
                    fullName: '', emailAddress: '', whatsappNumber: '', location: '',
                    decisionMaker: 'Myself', joinTiming: 'Immediately', currentStatus: 'Student',
                    hasLaptop: 'Yes', modeOfLearning: 'Online'
                });
            }, 3000);

        } catch (error) {
            console.error("Submission failed:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="gk-step-content animate-slide-up">
                        <div className="gk-compact-grid">
                            <div className="gk-form-group">
                                <label>Full Name *</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-solid fa-user"></i>
                                    <input type="text" name="fullName" required placeholder="Enter Your Name" value={formData.fullName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="gk-form-group">
                                <label>Email Address *</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input type="email" name="emailAddress" required placeholder="Enter Your Mail" value={formData.emailAddress} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="gk-form-group">
                                <label>WhatsApp *</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-solid fa-phone"></i>
                                    <input type="tel" name="whatsappNumber" required pattern="[0-9]{10}" placeholder="Number" value={formData.whatsappNumber} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="gk-form-group">
                                <label>Where are you from? *</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <input type="text" name="location" required placeholder="City/State" value={formData.location} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="gk-primary-btn gk-btn-full" style={{ marginTop: '15px' }} disabled={!formData.fullName || !formData.emailAddress || !formData.whatsappNumber || !formData.location}>
                            Only If youre serious- fill the form <i className="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="gk-step-content animate-slide-up">
                        <div className="gk-form-group">
                            <label className="gk-label-large">Who will make the final decision to join this course? *</label>
                            <div className="gk-select-wrapper">
                                <select name="decisionMaker" value={formData.decisionMaker} onChange={handleInputChange}>
                                    <option value="Myself">Myself</option>
                                    <option value="Parents">Parents</option>
                                    <option value="Others">Others</option>
                                </select>
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </div>
                        <div className="gk-btn-row">
                            <button type="button" onClick={prevStep} className="gk-secondary-btn">Back</button>
                            <button type="button" onClick={nextStep} className="gk-primary-btn">Next <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="gk-step-content animate-slide-up">
                        <div className="gk-form-group">
                            <label className="gk-label-large">When do you plan to join? *</label>
                            <div className="gk-card-options">
                                <button type="button" className={`gk-card-opt ${formData.joinTiming === 'Immediately' ? 'selected' : ''}`} onClick={() => setFormData({...formData, joinTiming: 'Immediately'})}>
                                    <i className="fa-solid fa-bolt"></i>
                                    <span>Immediately</span>
                                </button>
                                <button type="button" className={`gk-card-opt ${formData.joinTiming === 'Next Batch' ? 'selected' : ''}`} onClick={() => setFormData({...formData, joinTiming: 'Next Batch'})}>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <span>Next Batch</span>
                                </button>
                            </div>
                        </div>
                        <div className="gk-btn-row">
                            <button type="button" onClick={prevStep} className="gk-secondary-btn">Back</button>
                            <button type="button" onClick={nextStep} className="gk-primary-btn">Next <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="gk-step-content animate-slide-up">
                        <div className="gk-form-group">
                            <label className="gk-label-large">What are you doing right now? *</label>
                            <div className="gk-select-wrapper">
                                <select name="currentStatus" value={formData.currentStatus} onChange={handleInputChange}>
                                    <option value="Student">Student</option>
                                    <option value="Graduated">Graduated</option>
                                    <option value="Working Professional">Working Professional</option>
                                </select>
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </div>
                        <div className="gk-btn-row">
                            <button type="button" onClick={prevStep} className="gk-secondary-btn">Back</button>
                            <button type="button" onClick={nextStep} className="gk-primary-btn">Next <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="gk-step-content animate-slide-up">
                        <div className="gk-form-group">
                            <label className="gk-label-large">Do you have your laptop? *</label>
                            <div className="gk-card-options">
                                <button type="button" className={`gk-card-opt ${formData.hasLaptop === 'Yes' ? 'selected' : ''}`} onClick={() => setFormData({...formData, hasLaptop: 'Yes'})}>
                                    <i className="fa-solid fa-laptop"></i>
                                    <span>Yes</span>
                                </button>
                                <button type="button" className={`gk-card-opt ${formData.hasLaptop === 'No' ? 'selected' : ''}`} onClick={() => setFormData({...formData, hasLaptop: 'No'})}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                    <span>No</span>
                                </button>
                            </div>
                        </div>
                        <div className="gk-form-group">
                            <label>Preferred Mode of Learning *</label>
                            <div className="gk-select-wrapper">
                                <select name="modeOfLearning" value={formData.modeOfLearning} onChange={handleInputChange}>
                                    <option value="Online">Online</option>
                                </select>
                            </div>
                            <div className="gk-premium-note">
                                <i className="fa-solid fa-circle-info"></i>
                                <span>This is an <strong>Online only</strong> course. Please ensure you have a stable internet connection.</span>
                            </div>
                        </div>
                        <div className="gk-btn-row">
                            <button type="button" onClick={prevStep} className="gk-secondary-btn">Back</button>
                            <button type="submit" onClick={handleSubmit} className="gk-primary-btn gk-btn-pulse" disabled={status === 'loading' || status === 'success'}>
                                {status === 'loading' ? <><i className="fa-solid fa-spinner fa-spin"></i> Processing...</> : status === 'success' ? <><i className="fa-solid fa-check-circle"></i> Success!</> : <>Submit & Download <i className="fa-solid fa-download"></i></>}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="gk-premium-modal-overlay animate-fade-in">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap');

                .gk-premium-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.9);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    font-family: 'Barlow', sans-serif !important;
                    padding: 15px;
                }

                .gk-premium-modal-card {
                    width: 100%;
                    max-width: 500px;
                    max-height: 95vh;
                    background: #ffffff;
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.5);
                    position: relative;
                    animation: cardPop 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                    overflow: hidden;
                }

                @keyframes cardPop {
                    from { transform: scale(0.95) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }

                .gk-modal-header {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    padding: 20px 25px 15px;
                    color: #fff;
                    position: relative;
                    text-align: center;
                    flex-shrink: 0;
                }

                .gk-header-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 10% 20%, rgba(234, 88, 12, 0.1) 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, rgba(234, 88, 12, 0.15) 0%, transparent 40%);
                    opacity: 0.8;
                }

                .gk-modal-header h3 {
                    font-size: 1.3rem;
                    font-weight: 800;
                    margin-bottom: 2px;
                    letter-spacing: -0.5px;
                    color: #fff;
                    position: relative;
                    z-index: 1;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-modal-header p {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 500;
                    position: relative;
                    z-index: 1;
                    margin: 0;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-step-indicator-bg {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                }

                .gk-step-progress-fill {
                    height: 100%;
                    background: #ea580c;
                    transition: width 0.6s cubic-bezier(0.65, 0, 0.35, 1);
                }

                .gk-modal-body {
                    padding: 15px 25px 25px;
                    background: #fff;
                    overflow-y: auto;
                    flex-grow: 1;
                    max-height: 70vh;
                }

                .gk-modal-body::-webkit-scrollbar {
                    width: 6px;
                }
                .gk-modal-body::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }

                .gk-compact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .gk-form-group {
                    margin-bottom: 12px;
                }

                .gk-form-group label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #64748b;
                    margin-bottom: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-label-large {
                    font-size: 1rem !important;
                    text-transform: none !important;
                    letter-spacing: normal !important;
                    color: #0f172a !important;
                    line-height: 1.4;
                    font-weight: 700 !important;
                }

                .gk-input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .gk-input-wrapper i {
                    position: absolute;
                    left: 12px;
                    color: #cbd5e1;
                    font-size: 0.9rem;
                }

                .gk-input-wrapper input {
                    width: 100%;
                    padding: 10px 12px 10px 36px;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #0f172a;
                    background: #f8fafc;
                    transition: all 0.2s ease;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-input-wrapper input:focus {
                    border-color: #ea580c;
                    background: #fff;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
                }

                .gk-select-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .gk-select-wrapper select {
                    width: 100%;
                    padding: 10px 30px 10px 12px;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #0f172a;
                    background: #f8fafc;
                    appearance: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-select-wrapper i {
                    position: absolute;
                    right: 12px;
                    color: #94a3b8;
                    pointer-events: none;
                }

                .gk-card-options {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .gk-card-opt {
                    padding: 15px 10px;
                    background: #f8fafc;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 14px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-card-opt i {
                    font-size: 1.2rem;
                    color: #cbd5e1;
                    transition: all 0.3s ease;
                }

                .gk-card-opt span {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #64748b;
                }

                .gk-card-opt:hover {
                    border-color: #ea580c;
                    background: #fff;
                }

                .gk-card-opt.selected {
                    border-color: #ea580c;
                    background: #fff7ed;
                }

                .gk-card-opt.selected i {
                    color: #ea580c;
                }

                .gk-card-opt.selected span {
                    color: #ea580c;
                }

                .gk-btn-row {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;
                }

                .gk-primary-btn {
                    padding: 12px 20px;
                    background: #ea580c;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-primary-btn:hover:not(:disabled) {
                    background: #c2410c;
                }

                .gk-primary-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .gk-secondary-btn {
                    padding: 12px 18px;
                    background: #fff;
                    color: #64748b;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-premium-note {
                    margin-top: 10px;
                    padding: 10px;
                    background: #f0f9ff;
                    border-radius: 8px;
                    display: flex;
                    gap: 8px;
                    border: 1px solid #e0f2fe;
                }

                .gk-premium-note i {
                    color: #0ea5e9;
                    font-size: 0.8rem;
                    margin-top: 2px;
                }

                .gk-premium-note span {
                    font-size: 0.75rem;
                    color: #0369a1;
                    line-height: 1.4;
                    font-weight: 600;
                    font-family: 'Barlow', sans-serif !important;
                }

                .gk-close-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 28px;
                    height: 28px;
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    border-radius: 50%;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    z-index: 101;
                }

                .gk-close-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: rotate(90deg);
                }

                .animate-slide-up {
                    animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @media (max-width: 600px) {
                    .gk-premium-modal-card { border-radius: 0; height: 100%; max-height: 100vh; overflow-y: auto; }
                    .gk-compact-grid { grid-template-columns: 1fr; }
                    .gk-card-options { grid-template-columns: 1fr; gap: 10px; }
                    .gk-modal-body { padding: 20px 15px; }
                    .gk-modal-header { padding: 40px 15px 25px; }
                    .gk-modal-header h3 { font-size: 1.3rem; }
                    .gk-primary-btn { padding: 14px 20px; }
                }
            `}</style>

            <div className="gk-premium-modal-card">
                <button className="gk-close-btn" onClick={onClose} aria-label="Close">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="gk-modal-header">
                    <div className="gk-header-pattern"></div>
                    <h3>Curriculum Access</h3>
                    <p>{courseTitle}</p>
                    <div className="gk-step-indicator-bg">
                        <div className="gk-step-progress-fill" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
                    </div>
                </div>

                <div className="gk-modal-body">
                    <form onSubmit={currentStep === 1 ? nextStep : (e) => e.preventDefault()}>
                        {renderStep()}
                        
                        {status === 'error' && (
                            <div className="animate-slide-up" style={{ textAlign: 'center', marginTop: '20px', padding: '12px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fee2e2' }}>
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '700', margin: 0 }}>
                                    <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '8px' }}></i> Submission failed. Please try again.
                                </p>
                            </div>
                        )}
                        
                        {status === 'success' && (
                            <div className="animate-slide-up" style={{ textAlign: 'center', marginTop: '20px', padding: '12px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #dcfce7' }}>
                                <p style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: '700', margin: 0 }}>
                                    <i className="fa-solid fa-circle-check" style={{ marginRight: '8px' }}></i> Success! Download starting...
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrochureModal;
