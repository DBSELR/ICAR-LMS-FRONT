import React, { useEffect } from 'react';
import CoursesSection from '../components/home/CoursesSection';

const Courses = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
            <CoursesSection />
        </div>
    );
};

export default Courses;
