import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("home");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/') {
            if (location.pathname === '/online-skill-development-courses-india') setActiveTab('about');
            else if (location.pathname === '/get-in-touch-ed-vedha') setActiveTab('contact');
            else if (location.pathname === '/register') setActiveTab('register');
            else if (location.pathname === '/courses') setActiveTab('courses');
            else setActiveTab('');
            return;
        }

        const handleScroll = () => {
            const homeSection = document.getElementById('home');
            const coursesSection = document.getElementById('courses');

            let currentActive = "";

            if (homeSection) {
                const rect = homeSection.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentActive = "home";
                }
            }

            if (coursesSection) {
                const rect = coursesSection.getBoundingClientRect();
                if (rect.top <= 300 && rect.bottom >= 300) {
                    currentActive = "courses";
                }
            }

            setActiveTab(prevTab => prevTab !== currentActive ? currentActive : prevTab);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check after a slight delay to ensure elements are rendered
        setTimeout(handleScroll, 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const handleNavClick = (tab, e = null) => {
        if (e) e.preventDefault();
        setActiveTab(tab);
        if (tab === "home") {
            scrollToSection(tab);
        } else {
            setMenuOpen(false);
        }
    };

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
        setMenuOpen(false); // Close mobile menu
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigate("/register");
        window.scrollTo(0, 0);
        setMenuOpen(false);
    }

    return (
        <header className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
                    <img src="/assets/logo.png" alt="Ed Vedha" />
                </div>

                {/* Menu */}
                <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <a href="#home" onClick={(e) => handleNavClick("home", e)} className={activeTab === "home" ? "active" : ""}>Home</a>
                    <Link to="/courses" onClick={() => handleNavClick("courses")} className={activeTab === "courses" ? "active" : ""}>Courses</Link>
                    <Link to="/online-skill-development-courses-india" onClick={() => handleNavClick("about")} className={activeTab === "about" ? "active" : ""}>About Us</Link>
                    <Link to="/get-in-touch-ed-vedha" onClick={() => handleNavClick("contact")} className={activeTab === "contact" ? "active" : ""}>Contact Us</Link>
                    <div className="nav-buttons-group">
                        {/* <Link to="/calendly-demo" onClick={(e) => { setMenuOpen(false); window.scrollTo(0, 0); }} className="nav-demo-btn">Book a Demo</Link> */}
                        <a href="/register" onClick={handleRegisterClick} className="nav-cta-btn">Register</a>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <div
                    className={`hamburger ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
