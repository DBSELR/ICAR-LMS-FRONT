import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesData } from './courses/coursesData';
import BrochureModal from '../components/BrochureModal';

// Helper to get color class based on category (matching global.css border logic)
const getCategoryColor = (category) => {
    const map = {
        'Software': '#3b82f6', // Blue
        'Design': '#a855f7', // Purple
        'Business Courses': '#22c55e', // Green
        'Medical': '#ef4444', // Red
        'Competetive Exams': '#f59e0b', // Amber
        'Languages': '#ec4899', // Pink
        'Agriculture': '#84cc16', // Lime
        'Mechanical': '#6366f1', // Indigo
        'Civil': '#64748b', // Slate
        'Lifestyle': '#14b8a6', // Teal
    };
    return map[category] || '#ea580c'; // Default Orange
};

const seoMap = {
    'best-digital-marketing-course-online-india-with-certificate': {
        courseId: 301,
        title: 'Digital Marketing Course Online',
        description: 'Master Digital Marketing, SEO and Social Media Marketing to promote brands, generate leads and grow businesses through powerful online marketing strategies.'
    },
    'best-graphic-design-course-online-india-with-certificate': {
        courseId: 201,
        title: 'Graphic Designing Course Online',
        description: 'Learn Graphic Designing, Typography, Photography and Illustration to create professional branding, social media creatives and digital visual content.'
    },
    'best-video-editing-course-online-india-with-certificate': {
        courseId: 202,
        title: 'Video Editing Course Online in Vijayawada',
        description: 'Learn professional Video Editing and Motion Graphics to create stunning visual content, cinematic videos and engaging social media reels.Build creative editing skills with practical training and real-world digital media projects.'
    }
};

const CourseDetail = ({ seoSlug }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    let courseId = id ? parseInt(id) : null;
    let seoInfo = null;

    if (seoSlug && seoMap[seoSlug]) {
        courseId = seoMap[seoSlug].courseId;
        seoInfo = seoMap[seoSlug];
    }

    const course = coursesData.find(c => c.id === courseId);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (seoInfo) {
            document.title = seoInfo.title;
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = "description";
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = seoInfo.description;
        } else if (course) {
            document.title = `${course.title} | Ed Vedha`;
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = course.description;
            }
        }

        // Dynamically load Calendly script
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.title = "Ed Vedha - Bridging the Gap Between Education & Industry";
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = "Bridging the Gap Between Education & Industry";
            }
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [id, seoSlug]);

    if (!course) {
        return (
            <div className="gk-container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Course Not Found</h2>
                <Link to="/" style={{ maxWidth: '200px', margin: '20px auto', display: 'inline-block', padding: '14px 24px', background: '#ea580c', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Back to Home</Link>
            </div>
        );
    }


    const themeColor = getCategoryColor(course.category);

    const handleBack = () => {
        navigate('/', { state: { category: course.category, title: course.title } });
    };

    const handleDownloadBrochure = () => {
        setShowModal(true);
    };

    const handleModalDownload = () => {
        // Trigger actual file download or open PDF link
        // For demo: create a dummy link and click it
        // Or if you have a real URL in course data: window.open(course.brochureUrl, '_blank');

        /* 
           Demo Implementation: 
           Using 'MERN STACK.pdf' as the generic brochure for all courses as per requirement.
           Ideally `course.brochureUrl` would be in the data for specific files.
        */
        const link = document.createElement('a');
        link.href = course.brochureUrl || '/MERN STACK.pdf';
        link.download = `${course.title.replace(/\s+/g, '-')}-Curriculum.pdf`; // Force download name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Inline styles for dynamic theming
    const heroStyle = {
        background: `linear-gradient(135deg, ${themeColor}20 0%, #ffffff 100%)`,
        padding: '50px 20px',
        paddingTop: '120px',
        position: 'relative',
        overflow: 'hidden'
    };

    const sectionTitleStyle = {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '40px',
        position: 'relative',
        display: 'inline-block'
    };

    return (
        <div className="course-detail-page">
            {/* Custom Responsive Styles */}
            <style>
                {`
                    .cd-explore-btn {
                        padding: 14px 24px;
                        border-radius: 12px;
                        font-weight: 700;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        text-decoration: none;
                        width: 100%;
                        margin-bottom: 15px;
                    }
                    .cd-explore-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 20px -5px rgba(0,0,0,0.15);
                    }
                    .cd-meta-item {
                        font-size: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 16px;
                        background: #ffffff;
                        border-radius: 50px;
                        border: 1px solid #e2e8f0;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                    }
                    @media (max-width: 768px) {
                        .cd-hero-card { padding: 25px !important; width: 100% !important; }
                        .cd-price-current { font-size: 2rem !important; }
                        .cd-course-grid { grid-template-columns: 1fr !important; }
                        .cd-calendly-card { padding: 0px !important; background: transparent !important; border: none !important; box-shadow: none !important; border-radius: 0 !important; }
                    }
                `}
            </style>

            {/* Hero Section */}
            <section style={heroStyle}>
                <div className="gk-container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
                    <div style={{ flex: '1 1 300px', minWidth: '280px', maxWidth: '600px' }}>

                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            style={{
                                display: 'flex',
                                width: 'fit-content',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                color: '#475569',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                marginBottom: '25px',
                                cursor: 'pointer',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(-5px)';
                                e.currentTarget.style.color = themeColor;
                                e.currentTarget.style.borderColor = themeColor;
                                e.currentTarget.style.boxShadow = `0 10px 15px -3px ${themeColor}20`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.color = '#475569';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Back to Courses
                        </button>

                        <span style={{
                            background: themeColor,
                            color: '#fff',
                            padding: '6px 12px',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                            {course.category}
                        </span>
                        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw + 1rem, 3.5rem)', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '20px' }}>
                            {course.title}
                        </h1>
                        <p style={{ fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.2rem)', color: '#475569', lineHeight: '1.6', marginBottom: '30px', maxWidth: '600px' }}>
                            {course.description || "Master the skills needed to excel in this field with our comprehensive, industry-aligned curriculum."}
                        </p>

                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <div className="cd-meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span style={{ color: '#0f172a', fontWeight: '600' }}>{course.duration}</span>
                            </div>
                            <div className="cd-meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span style={{ color: '#0f172a', fontWeight: '600' }}>{course.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Card / Image */}
                    <div className="cd-hero-card" style={{
                        flex: '1 1 300px',
                        maxWidth: '450px',
                        background: '#fff',
                        padding: '40px',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                        border: `1px solid ${themeColor}30`,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 0 20px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}05 100%)`,
                            color: themeColor,
                            border: `1px solid ${themeColor}20`,
                            borderRadius: '50%',
                            boxShadow: `0 8px 20px -5px ${themeColor}30`
                        }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                            </svg>
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
                            Program Highlights
                        </h3>

                        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                            Master modern agricultural techniques through hands-on training, expert mentoring, and comprehensive field tools.
                        </p>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left', background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <i className="fa-solid fa-clock" style={{ color: themeColor, width: '20px', textAlign: 'center' }}></i>
                                <span style={{ fontWeight: '600', color: '#334155' }}>Duration: {course.duration}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <i className="fa-solid fa-seedling" style={{ color: themeColor, width: '20px', textAlign: 'center' }}></i>
                                <span style={{ fontWeight: '600', color: '#334155' }}>Category: {course.category}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <i className="fa-solid fa-user-graduate" style={{ color: themeColor, width: '20px', textAlign: 'center' }}></i>
                                <span style={{ fontWeight: '600', color: '#334155' }}>Role: {course.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BrochureModal
                isOpen={showModal}
                courseTitle={course.title}
                onDownload={handleModalDownload}
                onClose={() => setShowModal(false)}
            />

            {/* Course Modules Section */}
            <section style={{ padding: '80px 20px', background: '#ffffff' }}>
                <div className="gk-container">
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 18px',
                            background: `${themeColor}15`,
                            color: themeColor,
                            borderRadius: '50px',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            marginBottom: '16px',
                            letterSpacing: '0.5px'
                        }}>
                            <i className="fa-solid fa-book-open"></i> PROGRAM CURRICULUM
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: '1.2' }}>
                            Course Modules
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Structured step-by-step learning modules designed by agricultural experts to build comprehensive theoretical and practical knowledge.
                        </p>
                    </div>

                    <div className="cd-course-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '24px'
                    }}>
                        {(course.curriculum || []).map((item, index) => (
                            <div key={index} style={{
                                padding: '24px',
                                background: '#f8fafc',
                                borderRadius: '20px',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '18px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = `0 20px 25px -5px ${themeColor}15`;
                                    e.currentTarget.style.borderColor = themeColor;
                                    e.currentTarget.style.background = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.background = '#f8fafc';
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                                    color: '#ffffff',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '800',
                                    fontSize: '1.15rem',
                                    flexShrink: 0,
                                    boxShadow: `0 6px 12px -2px ${themeColor}40`
                                }}>
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </div>
                                <div style={{ flex: 1, paddingTop: '2px' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: themeColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Module {index + 1}
                                    </span>
                                    <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1e293b', marginTop: '4px', lineHeight: '1.4' }}>
                                        {item}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Covered Section */}
            {course.toolsCovered && course.toolsCovered.length > 0 && (
                <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)', borderTop: '1px solid #e2e8f0' }}>
                    <div className="gk-container">
                        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 18px',
                                background: '#0f172a',
                                color: '#ffffff',
                                borderRadius: '50px',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                marginBottom: '16px',
                                letterSpacing: '0.5px'
                            }}>
                                <i className="fa-solid fa-screwdriver-wrench"></i> PRACTICAL EQUIPMENT & SKILLS
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: '1.2' }}>
                                Tools Covered
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Get hands-on practical experience with industry-standard farm implements, testing equipment, and specialized agricultural units.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px'
                        }}>
                            {course.toolsCovered.map((tool, index) => (
                                <div key={index} style={{
                                    padding: '22px',
                                    background: '#ffffff',
                                    borderRadius: '18px',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
                                    transition: 'all 0.25s ease'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 12px 20px -3px rgba(0,0,0,0.08)';
                                        e.currentTarget.style.borderColor = `${themeColor}50`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.03)';
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                    }}
                                >
                                    <div style={{
                                        width: '46px',
                                        height: '46px',
                                        background: `${themeColor}15`,
                                        color: themeColor,
                                        borderRadius: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <i className="fa-solid fa-wrench" style={{ fontSize: '1.2rem' }}></i>
                                    </div>
                                    <span style={{ fontSize: '1.08rem', fontWeight: '700', color: '#1e293b' }}>{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default CourseDetail;
