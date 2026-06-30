import React from 'react';

const advantageData = [
  {
    id: 1,
    title: "Expert-Led Courses",
    description: "Learn from experienced instructors and industry professionals.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Digital Convenience",
    description: "Access courses anytime, anywhere, on your device.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Practical Learning",
    description: "Hands-on exercises, projects, and real-world case studies.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Support & Guidance",
    description: "Dedicated support team to help you every step of the way.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Placement Assistance",
    description: "Dedicated career support to help you land your dream job.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Flexible Learning",
    description: "Learn at your own pace with lifetime access to materials.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Affordable Pricing",
    description: "Premium quality education at accessible, pocket-friendly prices.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Valid Certification",
    description: "Earn industry-recognized certifications upon completion.",
    image: "https://plus.unsplash.com/premium_photo-1661549683908-b11e9855c469?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const AdvantageSection = () => {
  return (
    <section className="gk-advantage-section">
      <div className="gk-adv-container">

        {/* Header Section */}
        <div className="gk-adv-header">
          <span className="gk-adv-subtitle">DESIGNED FOR YOUR CAREER GROWTH</span>
          <h2 className="gk-adv-title">Why Choose Ed Vedha?</h2>
        </div>

        {/* Cards Grid */}
        <div className="gk-adv-grid">
          {advantageData.map((item) => (
            <div className="gk-adv-card" key={item.id}>
              {/* Background Image Layer */}
              <div
                className="gk-card-bg"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>

              {/* Gradient Overlay for text readability */}
              <div className="gk-card-overlay"></div>

              {/* Text Content */}
              <div className="gk-card-content" style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                padding: '24px 20px',
                textAlign: 'left'
              }}>
                <h3 className="gk-card-title" style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#ffffff', fontWeight: '800', lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <p className="gk-card-desc" style={{ margin: 0, fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.5, fontWeight: '500' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AdvantageSection;