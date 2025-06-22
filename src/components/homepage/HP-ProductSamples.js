import React from 'react';
import SeeProductButton from '../ui/SeeProductButton';
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../custom-hooks"

function HomepageProductSamples() {
    const navigate = useNavigate();

    const width = useWindowWidth();
    const isMobile = width < 768;

    const homepageProductSampleZero = isMobile ? "homepage-product-sample-zero-mobile" : "homepage-product-sample-zero"
    const homepageProductSampleZeroImage = isMobile ? "homepage-product-sample-zero-image-mobile" : "homepage-product-sample-zero-image"
    const homepageProductSampleZeroDiv = isMobile ? "homepage-product-sample-zero-div-mobile" : "homepage-product-sample-zero-div"
    
    const homepageProductSampleOne = isMobile ? "homepage-product-sample-one-mobile" : "homepage-product-sample-one"
    const homepageProductSampleOneImage = isMobile ? "homepage-product-sample-one-image-mobile" : "homepage-product-sample-one-image"
    const homepageProductSampleOneDiv = isMobile ? "homepage-product-sample-one-div-mobile" : "homepage-product-sample-one-div"
    
    const homepageProductSampleTwo = isMobile ? "homepage-product-sample-two-mobile" : "homepage-product-sample-two"
    const homepageProductSampleTwoImage = isMobile ? "homepage-product-sample-two-image-mobile" : "homepage-product-sample-two-image"
    const homepageProductSampleTwoDiv = isMobile ? "homepage-product-sample-two-div-mobile" : "homepage-product-sample-two-div"
    
    return (
        <div>
            <div
                className={homepageProductSampleZero}
            >
                <div className={homepageProductSampleZeroImage}>
                    <img
                    src="/assets/home/desktop/image-speaker-zx9.png"
                    alt="ZX9 Speaker"
                    style={{ maxHeight: "340px", width: "auto" }}
                    />
                </div>
                <div className={homepageProductSampleZeroDiv}>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: 0, lineHeight: 1.1 }}>ZX9 SPEAKER</h1>
                    <p style={{ margin: "24px 0", maxWidth: "320px", opacity: 0.9, textAlign: isMobile ? "center" : "left" }}>
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                    </p>
                    <SeeProductButton onClick={() => navigate("/product/6")} />
                </div>
            </div>
            <div
                className={homepageProductSampleOne}
            >
                <div className={homepageProductSampleOneImage}>
                    <img
                        src="/assets/home/desktop/image-speaker-zx7.jpg"
                        alt="ZX7 Speaker"
                        style={{ minHeight: "340px", width: "100%" }}
                    />
                    <div className={homepageProductSampleOneDiv}>
                        <h1 style={{ fontSize: isMobile ? "1.5rem" : "1rem", fontWeight: "bold", margin: 0, lineHeight: 1.1 }}>ZX7 SPEAKER</h1>
                        <SeeProductButton onClick={() => navigate("/product/5")} />
                    </div>
                </div>
            </div>
            <div className={homepageProductSampleTwo}>
                <div className={homepageProductSampleTwoImage}>
                    <img
                        src="/assets/home/desktop/image-earphones-yx1.jpg"
                        alt="ZX7 Speaker"
                        style={{ width: "100%", maxHeight: isMobile ? "180px" : "100%", height: "100%", borderRadius: "8px" }}
                    />
                </div>
                <div className={homepageProductSampleTwoDiv}>
                    <h1 style={{ fontSize: isMobile ? "1.5rem" : "1rem", fontWeight: "bold", margin: 0, lineHeight: 1.1, marginLeft: "20px" }}>YX1 EARPHONES</h1>
                    <SeeProductButton onClick={() => navigate("/product/1")} style={{marginLeft: "20px"}}/>
                </div>
            </div>
        </div>
    );
}

export default HomepageProductSamples;