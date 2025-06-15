import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{
        backgroundColor: "#101010",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "40px 200px",
        boxSizing: "border-box",
        color: "#fff",
        width: "100%",
    }}>
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
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
        <div style={{ display: "flex", alignItems: "end"}}>
            <p style={{ textAlign: "left", width: "50%"}}>
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
            </p>
            <div style={{width: "50%", display: "flex", justifyContent: "flex-end", gap: "20px", margin: "15px 0px"}}>
                <a target='_blank' href='https://facebook.com' rel="noreferrer"><img src="/assets/shared/desktop/icon-facebook.svg" alt="Facebook" /></a>
                <a target='_blank' href='https://x.com' rel="noreferrer"><img src="/assets/shared/desktop/icon-twitter.svg" alt="Twitter" /></a>
                <a target='_blank' href='https://instagram.com' rel="noreferrer"><img src="/assets/shared/desktop/icon-instagram.svg" alt="Instagram" /></a>
            </div>
        </div>
        <p style={{ textAlign: "left", width: "50%", alignSelf: "flex-start", margin: 0 }}>Copyright 2025. All Rights Reserved</p>
    </div>
  )
}

export default Footer