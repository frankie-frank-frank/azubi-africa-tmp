import React from 'react'
import { Link } from 'react-router-dom'
import { useWindowWidth } from "../../custom-hooks"

function Footer() {
    const width = useWindowWidth();
    const isMobile = width < 768;

    const footerNavLinksWrapperClass = isMobile ? "footer-nav-links-wrapper-mobile" : "footer-nav-links-wrapper";

    return (
        <div className="footer-container">
            <div className={footerNavLinksWrapperClass}>
                <div className="audiophile-icon-container">
                    <img src="/assets/shared/desktop/logo.svg" alt="Audiophile Logo" className='audiophile-logo'/>
                </div>
                <div className='footer-nav-links'>
                    <Link to="/"><button>HOME</button></Link>
                    <Link to="/headphones"><button>HEADPHONES</button></Link>
                    <Link to="/speakers"><button>SPEAKERS</button></Link>
                    <Link to="/earphones"><button>EARPHONES</button></Link>
                </div>
            </div>
            <div className="footer-closing-content">
                <p>
                    Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                </p>
                <div className="footer-closing-content-div">
                    <a target='_blank' href='https://facebook.com' rel="noreferrer"><img src="/assets/shared/desktop/icon-facebook.svg" alt="Facebook" /></a>
                    <a target='_blank' href='https://x.com' rel="noreferrer"><img src="/assets/shared/desktop/icon-twitter.svg" alt="Twitter" /></a>
                    <a target='_blank' href='https://instagram.com' rel="noreferrer"><img src="/assets/shared/desktop/icon-instagram.svg" alt="Instagram" /></a>
                </div>
            </div>
            <p className="footer-copyright">Copyright 2025. All Rights Reserved</p>
        </div>
    )
}

export default Footer