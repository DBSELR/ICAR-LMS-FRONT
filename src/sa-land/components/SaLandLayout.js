import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ScrollToTop from "./ScrollToTop";

const SaLandLayout = ({ children }) => {
    return (
        <div className="sa-land-root">
            <ScrollToTop />
            <Navbar />
            <main>{children}</main>
            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default SaLandLayout;
