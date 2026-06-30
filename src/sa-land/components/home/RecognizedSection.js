import React from 'react';

const recognitionsData = [
    {
        id: 1,
        title: "Startup India",
        subtitle: "Government of India",
        image: "/images/startupindia.png",
        alt: "Startup India Recognized #startupindia"
    },
    {
        id: 2,
        title: "MSME Registered",
        subtitle: "Govt. of India Enterprise",
        image: "/images/msme.png",
        alt: "MSME Micro, Small & Medium Enterprises"
    },
    {
        id: 3,
        title: "ISO 9001:2015",
        subtitle: "Certified Company",
        image: "/images/iso.png",
        alt: "ISO 9001:2015 Certified Company"
    },
    {
        id: 4,
        title: "AICTE",
        subtitle: "Approved Council",
        image: "/images/aicte.png",
        alt: "AICTE All India Council for Technical Education"
    }
];

const RecognizedSection = () => {
    return (
        <section className="sa-rec-section" id="recognized">
            <div className="gk-container">
                <div className="gk-section-header sa-rec-header">
                    <span className="gk-subtitle">OFFICIAL ACCREDITATIONS & TRUST</span>
                    <h2 className="gk-title">Recognized By</h2>
                    <div className="gk-underline"></div>
                </div>

                <div className="sa-rec-grid">
                    {recognitionsData.map((item) => (
                        <div className="sa-rec-card" key={item.id}>
                            <div className="sa-rec-glow"></div>
                            <div className="sa-rec-img-wrapper">
                                <img src={item.image} alt={item.alt} className="sa-rec-img" />
                            </div>
                            <div className="sa-rec-info">
                                <h4 className="sa-rec-title">{item.title}</h4>
                                <span className="sa-rec-subtitle">{item.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecognizedSection;
