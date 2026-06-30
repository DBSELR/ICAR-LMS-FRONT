import React, { useState, useEffect } from 'react';
import { Plus, Minus, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const faqData = [
    {
        question: "1. What is Edvedha?",
        answer: "Edvedha is a professional online learning platform that provides industry-oriented courses designed to help students, graduates, and working professionals upgrade their skills and advance their careers."
    },
    {
        question: "2. Who can enroll in Edvedha courses?",
        answer: "Anyone can enroll - students, fresh graduates, job seekers, working professionals, entrepreneurs, and career switchers."
    },
    {
        question: "3. Are Edvedha courses suitable only for beginners?",
        answer: "No, Edvedha offers:\n• Beginner-level courses for foundational knowledge\n• Intermediate programs for skill enhancement\n• Advanced & specialization programs for professionals"
    },
    {
        question: "4. What types of courses are offered?",
        answer: "Edvedha offers courses in:\n• Graphic Designing\n• Digital Marketing\n• Video Editing"
    },
    {
        question: "5. Are the courses self-paced or live?",
        answer: "Edvedha offers:\n• Self-paced recorded courses\n• Live instructor-led sessions\n• Hybrid learning programs\n• Offline Sessions\nCourse format depends on the selected program."
    },
    {
        question: "6. How long do the courses last?",
        answer: "Course duration varies from:\n• Short-term (1-2 months)\n• Medium-term (2–3 months)\n• Advanced programs (3–6 months)"
    },
    {
        question: "7. Do I get lifetime access?",
        answer: "Yes, most recorded courses provide lifetime access. Live programs may include limited access to recordings."
    },
    {
        question: "8. Are the courses updated regularly?",
        answer: "Yes, Courses are updated according to the latest industry standards and technology trends."
    },
    {
        question: "9. Will I receive a certificate?",
        answer: "Yes, You will receive a course completion certificate after successfully completing the course requirements."
    },
    {
        question: "10. Is the certificate industry-recognized?",
        answer: "Edvedha certificates demonstrate practical skill proficiency and can enhance your resume and LinkedIn profile."
    },
    {
        question: "11. Is there any exam for certification?",
        answer: "Some programs may include:\n• Assignments\n• Projects\n• Final assessments\nCertification may depend on successful completion."
    },
    {
        question: "12. Does Edvedha provide placement assistance?",
        answer: "Yes, select programs include:\n• Resume building\n• Interview preparation\n• Mock interviews\n• Job referrals (where applicable)"
    },
    {
        question: "13. Are internships provided?",
        answer: "Some career-focused programs offer internship opportunities or project-based experience."
    },
    {
        question: "14. Will I get real-world projects?",
        answer: "Yes, Most professional programs include hands-on projects to build practical skills."
    },
    {
        question: "15. How do I enroll?",
        answer: "You can enroll directly through the official website by selecting your course and completing the registration process."
    },
    {
        question: "16. What payment methods are accepted?",
        answer: "• Credit/Debit Cards\n• UPI\n• Net Banking\n• EMI options (if applicable)"
    },
    {
        question: "17. Is EMI available?",
        answer: "Yes, EMI options may be available for selected premium programs."
    },
    {
        question: "18. Is there a refund policy?",
        answer: "Refund policies vary by course. Please review the refund terms on the course page before enrolling."
    },
    {
        question: "19. What do I need to attend the course?",
        answer: "• Laptop or desktop\n• Stable internet connection\n• Basic computer knowledge"
    },
    {
        question: "20. Can I access courses on mobile?",
        answer: "Yes, recorded courses are mobile-friendly."
    },
    {
        question: "21. What if I face technical issues?",
        answer: "You can contact the support team via email or support portal for assistance."
    },
    {
        question: "22. Who are the instructors?",
        answer: "Courses are taught by industry professionals and experienced trainers."
    },
    {
        question: "23. Can I ask doubts?",
        answer: "Yes, Doubt-clearing sessions and discussion forums are available in most programs."
    },
    {
        question: "24. Is there mentorship support?",
        answer: "Yes, Premium programs may include 1-on-1 mentorship sessions."
    },
    {
        question: "25. Can I share my login credentials?",
        answer: "No, Accounts are for individual use only."
    },
    {
        question: "26. What if I forget my password?",
        answer: "You can reset your password using the “Forgot Password” option on the login page."
    },
    {
        question: "27. Are the courses available internationally?",
        answer: "Yes, Online courses can be accessed from anywhere."
    },
    {
        question: "28. Do you provide corporate training?",
        answer: "Yes, customized corporate training programs are available for organizations."
    },
    {
        question: "29. How can I contact Edvedha?",
        answer: "You can contact the support team via:\n• Official website contact form\n• Email support\n• Phone support (if listed on website)"
    }
];

const ITEMS_PER_SLIDE = 6;
const TOTAL_SLIDES = Math.ceil(faqData.length / ITEMS_PER_SLIDE);
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds per slide

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Auto slide effect
    useEffect(() => {
        let slideTimer;
        // Pause auto-sliding if the user hovers over the FAQ area or has an opened accordion
        if (!isHovered && activeIndex === null) {
            slideTimer = setInterval(() => {
                const nextSlideIndex = (currentSlide + 1) % TOTAL_SLIDES;
                handleSlideChange(nextSlideIndex);
            }, AUTO_SLIDE_INTERVAL);
        }

        return () => {
            if (slideTimer) clearInterval(slideTimer);
        };
    }, [currentSlide, isHovered, activeIndex]);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleSlideChange = (newSlide) => {
        if (newSlide >= 0 && newSlide < TOTAL_SLIDES && newSlide !== currentSlide) {
            setIsAnimating(true);
            setActiveIndex(null); // Close open answers when sliding
            setTimeout(() => {
                setCurrentSlide(newSlide);
                setIsAnimating(false);
            }, 300); // Matches CSS transition duration
        } else if (newSlide >= TOTAL_SLIDES) { // Loop to first slide
            setIsAnimating(true);
            setActiveIndex(null);
            setTimeout(() => {
                setCurrentSlide(0);
                setIsAnimating(false);
            }, 300);
        } else if (newSlide < 0) { // Loop to last slide
            setIsAnimating(true);
            setActiveIndex(null);
            setTimeout(() => {
                setCurrentSlide(TOTAL_SLIDES - 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    const nextSlide = () => handleSlideChange((currentSlide + 1) % TOTAL_SLIDES);
    const prevSlide = () => handleSlideChange((currentSlide - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);

    const startIndex = currentSlide * ITEMS_PER_SLIDE;
    const currentFaqs = faqData.slice(startIndex, startIndex + ITEMS_PER_SLIDE);

    return (
        <section className="sa-faq-modern-section" id="faq">
            <div className="sa-faq-bg-blob sa-faq-blob-1"></div>
            <div className="sa-faq-bg-blob sa-faq-blob-2"></div>

            <div
                className="sa-faq-modern-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="sa-faq-header-wrapper">
                    <div className="sa-faq-badge">
                        <MessageCircle size={16} />
                        <span>Got Questions?</span>
                    </div>
                    <h2 className="sa-faq-main-title">
                        Frequently Asked Questions
                    </h2>
                    <p className="sa-faq-sub-title">
                        Everything you need to know about Edvedha and our training programs.
                    </p>
                </div>

                <div className={`sa-faq-slider-wrapper ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                    <div className="sa-faq-accordion-container">
                        {currentFaqs.map((faq, index) => {
                            const actualIndex = startIndex + index;
                            const isActive = activeIndex === actualIndex;
                            return (
                                <div
                                    key={actualIndex}
                                    className={`sa-faq-accordion-item ${isActive ? 'active' : ''}`}
                                >
                                    <button
                                        className="sa-faq-accordion-header"
                                        onClick={() => toggleFAQ(actualIndex)}
                                        aria-expanded={isActive}
                                    >
                                        <span className="sa-faq-accordion-question">{faq.question}</span>
                                        <div className="sa-faq-accordion-icon">
                                            {isActive ? <Minus size={20} /> : <Plus size={20} />}
                                        </div>
                                    </button>
                                    <div className="sa-faq-accordion-collapse">
                                        <div className="sa-faq-accordion-body">
                                            <p style={{ whiteSpace: 'pre-line' }}>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Pagination Controls */}
                {TOTAL_SLIDES > 1 && (
                    <div className="sa-faq-pagination">
                        <button
                            className="sa-faq-page-btn"
                            onClick={prevSlide}
                            disabled={isAnimating}
                            aria-label="Previous FAQs"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="sa-faq-dots">
                            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`sa-faq-dot ${currentSlide === idx ? 'active' : ''}`}
                                    onClick={() => handleSlideChange(idx)}
                                    disabled={isAnimating || currentSlide === idx}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            className="sa-faq-page-btn"
                            onClick={nextSlide}
                            disabled={isAnimating}
                            aria-label="Next FAQs"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQPage;
