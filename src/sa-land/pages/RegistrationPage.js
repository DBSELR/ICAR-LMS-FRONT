import React, { useState, useEffect } from "react";

// REPLACE THIS WITH YOUR NEW DEPLOYED REGISTRATION GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyhAXGXnRayH2xuq4letZMQqqHKN4J3JQnIOrFY5k8p99D0X9hw_UssEuUvDMgv6PV4/exec";

const RegistrationPage = () => {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        course: "",
        feeType: "registration", // Default to registration
    });

    // const [extraDiscount, setExtraDiscount] = useState(0); // Extra discount for existing mobile
    const [loaded, setLoaded] = useState(false); // Animation trigger
    const [courses, setCourses] = useState([]);
    const [dummyPaying, setDummyPaying] = useState(false);

    useEffect(() => {
        setLoaded(true);
        // Fetch courses initially without mobile
        fetchCourses();
    }, []);

    // Fetch courses function with optional mobile number
    const fetchCourses = async (mobileNo = null) => {
        try {
            const url = mobileNo
                ? `https://api.edvedha.in/api/student/LandingFeeCalculation?mobileNo=${mobileNo}`
                : "https://api.edvedha.in/api/student/LandingFeeCalculation";
            const res = await fetch(url);
            const data = await res.json();

            // Limit to specific courses and fix formatting
            const allowed = ["Graphic Designing", "Video Editing", "Digital Marketing"];
            const filteredData = data
                .filter(c => allowed.includes(c.programmeName.trim()) || c.programmeName.toUpperCase() === "VIDEO EDITING")
                .map(c => ({
                    ...c,
                    programmeName: c.programmeName.toUpperCase() === "VIDEO EDITING" ? "Video Editing" : c.programmeName
                }));

            setCourses(filteredData);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle phone number input and check for extra discount
    const [disabledProgrammeId, setDisabledProgrammeId] = useState(null); // Store the programmeId that is disabled
    const [paymentDisabled, setPaymentDisabled] = useState(false); // Derived state for UI

    // Update paymentDisabled whenever disabledProgrammeId or selected course changes
    useEffect(() => {
        const selectedCourse = courses.find(c => c.programmeName === formData.course);
        if (selectedCourse && disabledProgrammeId && selectedCourse.programmeId === disabledProgrammeId) {
            setPaymentDisabled(true);
        } else {
            setPaymentDisabled(false);
        }
    }, [disabledProgrammeId, formData.course, courses]);


    // Fetch student details by mobile
    const fetchStudentDetails = async (mobileNo) => {
        try {
            const res = await fetch(`https://api.edvedha.in/api/Student/GetStudentDetailsByMobile/${mobileNo}`);
            if (res.ok) {
                const data = await res.json();
                console.log("Fetched student details:", data);
                if (data) {
                    setFormData((prev) => ({
                        ...prev,
                        firstName: data.firstName || prev.firstName,
                        lastName: data.lastName || prev.lastName,
                        email: data.email || prev.email,
                        course: data.programme || prev.course, // Auto-select course if matches
                    }));
                }
            }
        } catch (err) {
            console.error("Error fetching student details:", err);
        }
    };

    // Fetch payment status by mobile
    const fetchPaymentStatus = async (mobileNo) => {
        try {
            const res = await fetch(`https://api.edvedha.in/api/Student/GetStudentPaymentStatus/${mobileNo}`);
            if (res.ok) {
                const data = await res.json();
                console.log("Fetched payment status:", data);
                if (data && data.paymentStatus === "DISABLE") {
                    setDisabledProgrammeId(data.programmeId || data.groupId); // Store disabled programme ID
                } else {
                    setDisabledProgrammeId(null);
                }
            } else {
                setDisabledProgrammeId(null);
            }
        } catch (err) {
            console.error("Error fetching payment status:", err);
            setDisabledProgrammeId(null);
        }
    };

    // Handle phone number input and check for extra discount
    const handlePhoneChange = async (e) => {
        const phone = e.target.value;

        setFormData((prev) => ({
            ...prev,
            phone,
        }));

        if (phone.length === 10) {
            await fetchCourses(phone); // apply loyalty discount if exists
            await fetchStudentDetails(phone); // Auto-fill details
            await fetchPaymentStatus(phone); // Check payment status
        } else {
            if (formData.phone.length === 10 && phone.length !== 10) {
                await fetchCourses(null); // reset to base offer only if it was previously 10 digits
                setDisabledProgrammeId(null); // Reset payment status
            }
        }
    };

    const submitToGoogleSheets = async (data) => {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify(data),
            });
            console.log("Submitted Registration Lead to Google Sheets");
        } catch (error) {
            console.error("Error submitting Registration Lead to Google Sheets:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dummyPaying) return;

        // Basic validations
        if (!formData.phone || formData.phone.length !== 10) {
            alert("Enter a valid 10-digit mobile number");
            return;
        }
        if (!formData.email || !formData.firstName || !formData.course) {
            alert("Email, First Name, and Course are required.");
            return;
        }

        setDummyPaying(true);

        try {
            const selectedCourse = courses.find(
                (c) => c.programmeName === formData.course,
            );
            const programmeId = selectedCourse ? selectedCourse.programmeId : 0;

            // Register student
            const registrationPayload = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phone,
                programmeId: programmeId,
            };

            console.log("🚀 Registration payload:", registrationPayload);

            // Send to Google Sheets (Fire and forget)
            const formattedMobile = formData.phone.startsWith('+') ? `'${formData.phone}` : `'+91 ${formData.phone}`;
            const sheetPayload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                mobileNo: formattedMobile,
                course: formData.course,
                Source: 'Registration Page'
            };
            submitToGoogleSheets(sheetPayload);

            const registrationRes = await fetch(
                "https://api.edvedha.in/api/student/Landingregister",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registrationPayload),
                },
            );

            if (!registrationRes.ok) {
                const errorText = await registrationRes.text();
                console.error("Registration failed:", errorText);
                try {
                    const errorObj = JSON.parse(errorText);
                    if (errorObj.errors) {
                        const messages = Object.values(errorObj.errors).flat().join("\n");
                        alert("Registration Failed:\n" + messages);
                    } else {
                        alert("Registration Failed: " + (errorObj.title || errorText));
                    }
                } catch {
                    alert("Registration Failed: " + errorText);
                }
                setDummyPaying(false);
                return;
            }

            const regResult = await registrationRes.json();
            const username = regResult.username || regResult.Username;

            if (!username) {
                alert("Registration successful, but username missing from response.");
                setDummyPaying(false);
                return;
            }

            console.log("✅ Registration successful. Username:", username);

            // Calculate amount (production)
            const amount =
                formData.feeType === "registration"
                    ? 499
                    : selectedCourse
                        ? selectedCourse.offerFee
                        : 0;

            // Initiate payment
            const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();

            const paymentPayload = {
                Username: username,
                MobileNumber: formData.phone,
                Amount: amount,
                Name: fullName || username,
                BatchName: "",
                ProgrammeId: programmeId,
                GroupId: 0,
            };

            console.log("🚀 Payment initiate payload:", paymentPayload);

            const payRes = await fetch(
                "https://api.edvedha.in/api/payments/phonepe/initiate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentPayload),
                },
            );

            if (!payRes.ok) {
                const payErrText = await payRes.text();
                console.error("Payment initiate failed:", payErrText);
                alert(
                    "Registration completed, but payment could not be started. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            const payResult = await payRes.json();
            console.log("✅ Payment initiated successfully:", payResult);

            const redirectUrl = payResult.redirectUrl;
            const merchantOrderId = payResult.merchantOrderId;

            if (!redirectUrl) {
                console.error("PhonePe redirectUrl missing", payResult);
                alert(
                    "Registration completed, but payment URL missing. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            // Store payment info for PaymentResult
            localStorage.setItem(
                "paymentInfo",
                JSON.stringify({
                    merchantOrderId: merchantOrderId,
                    username: username,
                    amount: amount,
                    courseInfo: formData.course,
                    timestamp: new Date().toISOString(),
                }),
            );

            // Redirect to payment gateway
            window.location.href = redirectUrl;
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setDummyPaying(false);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const handleDummyPayment = async (e) => {
        e.preventDefault();
        if (dummyPaying) return;

        // Validation
        if (!formData.phone || formData.phone.length !== 10) {
            alert("Enter a valid 10-digit mobile number");
            return;
        }

        if (!formData.email || !formData.firstName || !formData.course) {
            alert("Email, First Name, and Course are required.");
            return;
        }

        setDummyPaying(true);

        try {
            const selectedCourseData = courses.find(
                (c) => c.programmeName === formData.course,
            );
            const programmeId = selectedCourseData ? selectedCourseData.programmeId : 0;

            // Step 1: Register the student
            const registrationPayload = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phone,
                programmeId: programmeId,
            };

            console.log("🚀 Registration payload:", registrationPayload);

            const registrationRes = await fetch(
                "https://api.edvedha.in/api/student/Landingregister",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registrationPayload),
                },
            );

            if (!registrationRes.ok) {
                const errorText = await registrationRes.text();
                console.error("Registration failed:", errorText);
                try {
                    const errorObj = JSON.parse(errorText);
                    if (errorObj.errors) {
                        const messages = Object.values(errorObj.errors).flat().join("\n");
                        alert("Registration Failed:\n" + messages);
                    } else {
                        alert("Registration Failed: " + (errorObj.title || errorText));
                    }
                } catch {
                    alert("Registration Failed: " + errorText);
                }
                setDummyPaying(false);
                return;
            }

            const regResult = await registrationRes.json();
            const username = regResult.username || regResult.Username;

            if (!username) {
                alert("Registration successful, but username missing from response.");
                setDummyPaying(false);
                return;
            }

            console.log("✅ Registration successful. Username:", username);

            // Step 2: Calculate amount (fixed 1 rupee for testing)
            const amount = 1;

            // Step 3: Initiate payment
            const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();

            const paymentPayload = {
                Username: username,
                MobileNumber: formData.phone,
                Amount: amount,
                Name: fullName || username,
                BatchName: "", // Optional
                ProgrammeId: programmeId,
                GroupId: 0, // Optional
            };

            console.log("🚀 Payment initiate payload:", paymentPayload);

            const payRes = await fetch(
                "https://api.edvedha.in/api/payments/phonepe/initiate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentPayload),
                },
            );

            if (!payRes.ok) {
                const payErrText = await payRes.text();
                console.error("Payment initiate failed:", payErrText);
                alert(
                    "Registration completed, but payment could not be started. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            const payResult = await payRes.json();
            console.log("✅ Payment initiated successfully:", payResult);

            const redirectUrl = payResult.redirectUrl;
            const merchantOrderId = payResult.merchantOrderId;

            if (!redirectUrl) {
                console.error("PhonePe redirectUrl missing", payResult);
                alert(
                    "Registration completed, but payment URL missing. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            // Store payment info in localStorage for payment-result page
            localStorage.setItem(
                "paymentInfo",
                JSON.stringify({
                    merchantOrderId: merchantOrderId,
                    username: username,
                    amount: amount,
                    courseInfo: formData.course,
                    timestamp: new Date().toISOString(),
                }),
            );

            // Redirect to PhonePe payment gateway
            window.location.href = redirectUrl;
        } catch (err) {
            console.error("Error in payment flow:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setDummyPaying(false);
        }
    };

    const selectedCourse = courses.find(
        (c) => c.programmeName === formData.course,
    );

    // Calculate display fee with extra discount
    const displayFee = selectedCourse ? selectedCourse.offerFee : "Select Course";

    return (
        <div className="gk-reg-container">
            <div className={`gk-reg-wrapper ${loaded ? "loaded" : ""}`}>
                {/* Left Side: Visual & Brand */}
                <div className="gk-reg-visual">
                    <div className="gk-visual-decor gk-blob-1"></div>
                    <div className="gk-visual-decor gk-blob-2"></div>
                    <div className="gk-visual-content">
                        <div className="gk-brand-tag">
                            <img src="/assets/logo.png" alt="Ed Vedha" className="gk-reg-logo" />
                        </div>
                        <h1 className="gk-visual-title">
                            Start your <br />
                            <span className="gk-text-highlight">Learning Journey.</span>
                        </h1>
                        <p className="gk-visual-desc">
                            Join a community of 10,000+ learners and master the skills top
                            companies are hiring for today.
                        </p>
                        <div className="gk-features-list">
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i>{" "}
                                <span>Life-time Access</span>
                            </div>
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i>{" "}
                                <span>Expert Mentorship</span>
                            </div>
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i>{" "}
                                <span>Global Certification</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="gk-reg-form-section">
                    <div className="gk-form-header">
                        <h2>Create Account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="gk-reg-form">
                        {/* Phone & Email */}
                        <div className="gk-form-row">
                            <div className="gk-input-field">
                                <label>Phone Number</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-solid fa-phone gk-input-icon"></i>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Mobile Number"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="gk-input-field">
                                <label>Email Address</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-regular fa-envelope gk-input-icon"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Name Fields */}
                        <div className="gk-form-row">
                            <div className="gk-input-field">
                                <label>First Name</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-regular fa-user gk-input-icon"></i>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="gk-input-field">
                                <label>Last Name</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-regular fa-user gk-input-icon"></i>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course Selection */}
                        <div className="gk-input-field">
                            <label>Interested Course</label>
                            <div className="gk-input-wrapper">
                                <i className="fa-solid fa-graduation-cap gk-input-icon"></i>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select your Course
                                    </option>
                                    {courses.map((course) => (
                                        <option
                                            key={course.programmeId}
                                            value={course.programmeName}
                                        >
                                            {course.programmeName}
                                        </option>
                                    ))}
                                </select>
                                <i className="fa-solid fa-chevron-down gk-select-arrow"></i>
                            </div>
                        </div>

                        <button type="submit" className="gk-reg-btn" disabled={paymentDisabled} style={{ opacity: paymentDisabled ? 0.5 : 1, cursor: paymentDisabled ? 'not-allowed' : 'pointer' }}>
                            {paymentDisabled ? "Payment Disabled" : (<span>Register Now <i className="fa-solid fa-arrow-right-long"></i></span>)}
                        </button>
                        <div style={{ marginTop: "18px", textAlign: "center", fontSize: "0.95rem", color: "#64748b" }}>
                            Already registered or want to access LMS?{" "}
                            <a href="/login" style={{ color: "#ea580c", fontWeight: "600", textDecoration: "underline" }}>
                                Login Here
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
