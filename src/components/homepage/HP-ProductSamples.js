import React from 'react';
import SeeProductButton from '../ui/SeeProductButton';
import { useNavigate } from "react-router-dom";

function HomepageProductSamples() {
    const navigate = useNavigate();
    return (
        <div>
            <div
                style={{
                    background: "#d87d4a",
                    backgroundImage: "url('/assets/home/desktop/pattern-circles.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",        
                    borderRadius: "8px",
                    margin: "100px 200px 60px 200px",
                    maxHeight: "400px",
                    display: "flex",
                    alignItems: "flex-start",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <div style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "90px",
                    zIndex: 2
                }}>
                    <img
                    src="/assets/home/desktop/image-speaker-zx9.png"
                    alt="ZX9 Speaker"
                    style={{ maxHeight: "340px", width: "auto" }}
                    />
                </div>
                <div style={{
                    flex: 1,
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingLeft: "60px",
                    paddingTop: "90px",
                    zIndex: 2
                }}>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: 0, lineHeight: 1.1 }}>ZX9 SPEAKER</h1>
                    <p style={{ margin: "24px 0", maxWidth: "320px", opacity: 0.9, textAlign: "left" }}>
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                    </p>
                    <SeeProductButton onClick={() => navigate("/product/6")} />
                </div>
            </div>
            <div
                style={{
                    background: "#e7e7e7",
                    borderRadius: "8px",
                    margin: "100px 200px",
                    maxHeight: "400px",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <div style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    zIndex: 2
                }}>
                    <img
                        src="/assets/home/desktop/image-speaker-zx7.jpg"
                        alt="ZX7 Speaker"
                        style={{ minHeight: "340px", width: "100%" }}
                    />
                    <div style={{
                        flex: 1,
                        color: "#000",
                        display: "flex",
                        position: "absolute",
                        top: 150,
                        left: 40,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: '12px',
                        paddingLeft: "120px",
                        zIndex: 2
                    }}>
                        <h1 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0, lineHeight: 1.1 }}>ZX7 SPEAKER</h1>
                        <SeeProductButton onClick={() => navigate("/product/5")} />
                    </div>
                </div>
            </div>
            <div
                style={{
                    margin: "100px 200px",
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div style={{
                    flex: 1,
                    display: "flex",
                    borderRadius: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                    height: "100%"
                }}>
                    <img
                        src="/assets/home/desktop/image-earphones-yx1.jpg"
                        alt="ZX7 Speaker"
                        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                    />
                </div>
                <div style={{
                    flex: 1,
                    color: "#000",
                    display: "flex",
                    backgroundColor: "#efefef",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: '12px',
                    paddingLeft: "120px",
                    zIndex: 2,
                    height: "100%",
                    borderRadius: "8px",
                }}>
                    <h1 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0, lineHeight: 1.1 }}>YX1 EARPHONES</h1>
                    <SeeProductButton onClick={() => navigate("/product/1")} />
                </div>
            </div>
        </div>
    );
}

export default HomepageProductSamples;