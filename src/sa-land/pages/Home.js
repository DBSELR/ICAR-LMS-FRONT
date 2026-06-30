import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Hero from "../components/home/Hero";
import RecognizedSection from "../components/home/RecognizedSection";
import CoursesSection from "../components/home/CoursesSection";
import AdvantageSection from "../components/home/AdvantageSection";

import DemoBook from "../components/home/DemoBook";

import Testimonials from "../components/home/Testimonials";
import Banner from "../components/home/Banner";

const Home = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Check both router params (after hash) and window params (before hash)
        let ref = searchParams.get("ref");
        if (!ref) {
            const windowParams = new URLSearchParams(window.location.search);
            ref = windowParams.get("ref");
        }

        if (ref) {
            axios.post(
                `https://api.edvedha.in/api/BulkSms/save?ref=${encodeURIComponent(ref)}`
            )
                .then(() => console.log("Lead saved successfully"))
                .catch(err => console.error("Lead tracking failed", err));
        }
    }, [searchParams]);

    return (
        <>
            <div id="home"><Hero /></div>
            <RecognizedSection />
            <div id="courses"><CoursesSection /></div>
            <DemoBook />
            <AdvantageSection />
         
            <Testimonials />
            
            <Banner />
        </>
    );
};

export default Home;
