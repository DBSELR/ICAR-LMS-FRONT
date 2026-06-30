import React from 'react';
import { Target, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';

const Mission = () => {
    return (
        <section className="sa-mv-section">
            {/* Animated Background Elements */}
            <div className="sa-mv-bg-animated sa-bg-1"></div>
            <div className="sa-mv-bg-animated sa-bg-2"></div>
            <div className="sa-mv-grid-pattern"></div>

            <div className="sa-mv-container">
                <div className="sa-mv-header-wrapper">
                    <div className="sa-mv-badge-container">
                        <span className="sa-mv-badge">Our Purpose</span>
                    </div>
                    <h2 className="sa-mv-title">
                        Mission <span className="sa-mv-highlight">&</span> Vision
                    </h2>
                    <p className="sa-mv-subtitle">
                        Driving the future of agriculture and precision technology through hands-on field skills, scientific farming practices, and expert mentorship.
                    </p>
                </div>

                <div className="sa-mv-cards-wrapper">
                    {/* Mission Card */}
                    <div className="sa-mv-card sa-mv-mission">
                        <div className="sa-mv-card-glow"></div>
                        <div className="sa-mv-card-inner">
                            <div className="sa-mv-icon-wrapper">
                                <div className="sa-mv-icon-ring sa-ring-1"></div>
                                <div className="sa-mv-icon-ring sa-ring-2"></div>
                                <div className="sa-mv-icon-circle">
                                    <Target size={36} strokeWidth={2} className="sa-mv-icon" />
                                </div>
                            </div>

                            <h3 className="sa-mv-card-title">Mission – Ed Vedha</h3>
                            <div className="sa-mv-divider"></div>

                            <ul className="sa-mv-list">
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Provide scientific, practical training in organic farming and modern agriculture.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Bridge traditional agricultural practices with cutting-edge agritech and IoT automation.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Empower farmers and students with hands-on field projects, soil testing, and precision drone skills.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Enable sustainable farm entrepreneurship and high-yield crop productivity across India.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="sa-mv-card sa-mv-vision">
                        <div className="sa-mv-card-glow sa-glow-alt"></div>
                        <div className="sa-mv-card-inner">
                            <div className="sa-mv-icon-wrapper sa-wrapper-alt">
                                <div className="sa-mv-icon-ring sa-ring-1"></div>
                                <div className="sa-mv-icon-ring sa-ring-2"></div>
                                <div className="sa-mv-icon-circle sa-circle-alt">
                                    <Eye size={36} strokeWidth={2} className="sa-mv-icon" />
                                </div>
                            </div>

                            <h3 className="sa-mv-card-title">Vision – Ed Vedha</h3>
                            <div className="sa-mv-divider"></div>

                            <ul className="sa-mv-list">
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Become India's most trusted platform for professional agricultural and agritech education.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Create industry-ready agronomists, precision farming specialists, and commercial farm entrepreneurs.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Shape the future of smart agriculture through emerging technologies like drone precision and automated irrigation.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Transform rural and urban farming through scientific training, sustainability, and career excellence.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
