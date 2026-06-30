import React, { useEffect } from 'react';
import AboutSection from '../components/about/AboutSection';
import Mission from '../components/about/Mission';

const About = () => {
    useEffect(() => {
        document.title = "Ed Vedha | Empowering Agricultural & Tech Professionals";
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = "Ed Vedha is a premier professional learning platform dedicated to equipping farmers, students, and entrepreneurs with modern scientific practices and practical skills in Organic Farming, Mushroom Cultivation, Agri Drones, and Drip Irrigation.";

        return () => {
            document.title = "Ed Vedha - Practical Professional & Agricultural Training";
            if (metaDesc) {
                metaDesc.content = "Practical Professional & Agricultural Training";
            }
        };
    }, []);

    return (
        <>
            <AboutSection />
            <Mission />
        </>
    );
};

export default About;