import React from 'react';

const testimonialsData = [
    {
        id: 1,
        name: "Geetha",
        role: "Organic Farming Specialist",
        rating: 5,
        feedback: "I joined Ed Vedha with a traditional farming background, but the practical soil nutrient management and live composting training gave me real-time experience. Now I am confidently managing a certified organic farm with chemical-free cultivation.",
        image: "/images/geetha.jpeg",
        initial: "G",
        color: "#3B82F6"
    },
    {
        id: 2,
        name: "Niharika",
        role: "Mushroom Cultivator",
        rating: 5,
        feedback: "Ed Vedha focuses on practical Mushroom Cultivation training with spawn production, bed preparation, climate control, and harvesting support. The step-by-step guidance helped me successfully set up my own commercial oyster mushroom unit.",
        image: "/images/niharika.jpeg",
        initial: "N",
        color: "#10B981"
    },
    {
        id: 3,
        name: "Subhash",
        role: "Vermicompost Expert",
        rating: 5,
        feedback: "Best agricultural training platform to learn Vermicomposting and biofertilizer production from basics to advanced. The practical commercial bed setup plans and organic waste management lessons helped me turn farm waste into a profitable business.",
        image: "/images/subhash.jpeg",
        initial: "S",
        color: "#F59E0B"
    },
    {
        id: 4,
        name: "Padma P",
        role: "Urban Gardening Expert",
        rating: 5,
        feedback: "I learned Terrace Gardening, container setup, organic pest management, and drip watering systems with practical project training, helping me confidently transform urban spaces into productive vegetable and fruit gardens.",
        image: "/images/padma.jpeg",
        initial: "P",
        color: "#EF4444"
    },
    {
        id: 5,
        name: "Anusha",
        role: "Irrigation Specialist",
        rating: 5,
        feedback: "Best Drip Irrigation institute for beginners and agricultural professionals with practical training in fertigation units, micro-irrigation layout design, and water optimization techniques.",
        image: "/images/anusha.jpeg",
        initial: "A",
        color: "#EC4899"
    },
    {
        id: 6,
        name: "Vishnu",
        role: "Millets Specialist",
        rating: 5,
        feedback: "Ed Vedha helped me build strong expertise in climate-resilient Millets cultivation with seed selection, nutrient management, and value-add marketing strategies for sustainable farming.",
        image: "/images/vishnu.jpeg",
        initial: "V",
        color: "#8B5CF6"
    }
];

const Testimonials = () => {
    return (
        <section className="gk-testimonials-section" id="testimonials">
            <div className="gk-container">
                <div className="gk-section-header">
                    <span className="gk-subtitle">STUDENT SUCCESS STORIES</span>
                    <h2 className="gk-title">What Our Learners Say</h2>
                    <div className="gk-underline"></div>
                </div>

                <div className="modern-testimonials-grid">
                    {testimonialsData.map((item, index) => (
                        <div className="modern-testimonial-card" style={{ animationDelay: `${index * 0.15}s` }} key={`testimonial-${item.id}`}>
                            <div className="modern-card-top">
                                <div className="modern-user-profile">
                                    {item.image ? (
                                        <div className="modern-user-avatar" style={{ overflow: 'hidden', padding: 0, border: '2px solid ' + item.color }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '105%', objectFit: 'cover' }} />
                                        </div>
                                    ) : (
                                        <div className="modern-user-avatar" style={{ backgroundColor: item.color }}>
                                            {item.initial}
                                        </div>
                                    )}
                                    <div className="modern-user-info">
                                        <h4 className="modern-user-name">{item.name}</h4>
                                        <span className="modern-user-role">{item.role}</span>
                                    </div>
                                </div>
                                <div className="modern-quote-icon">
                                    <i className="fas fa-quote-right"></i>
                                </div>
                            </div>

                            <div className="modern-star-rating">
                                {[...Array(item.rating)].map((_, i) => (
                                    <i key={i} className="fas fa-star"></i>
                                ))}
                            </div>

                            <p className="modern-user-feedback">{item.feedback}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
