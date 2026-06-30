import React from 'react';

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/918297222303"
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
        </a>
    );
};

export default WhatsAppButton;
