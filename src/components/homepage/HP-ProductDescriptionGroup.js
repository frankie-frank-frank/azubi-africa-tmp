import React from 'react'
import { useWindowWidth } from "../../custom-hooks"

function ProductDescriptionGroup({ stylesVal = {}}) {
    const width = useWindowWidth();
    const isMobile = width < 768;

    const productDescriptionGroupClass = isMobile ? "product-description-group-mobile" : "product-description-group"
    const productDescriptionGroupTextClass = isMobile ? "product-description-group-text-mobile" : "product-description-group-text";
    const productDescriptionGroupImageClass = isMobile ? "product-description-group-image-mobile" : "product-description-group-image";

    return (
        <div
            className={productDescriptionGroupClass}
            style={{
                ...stylesVal
            }}
        >
            <div className={productDescriptionGroupTextClass}>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: 0, lineHeight: 1.1 }} className={isMobile ? "pdg-text-mobile-header" : ""}>BRINGING YOU THE <span style={{color: "#D87D4A"}}>BEST</span> AUDIO GEAR</h1>
                <p style={{ 
                    opacity: 0.5, 
                    textAlign: "left",
                    lineHeight: 1.5
                }}>
                    Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                </p>
            </div>
            <div className={productDescriptionGroupImageClass}>
                <img style={{borderRadius: "8px"}} src='/assets/shared/desktop/image-best-gear.jpg' alt="Best gear" />
            </div>
        </div>
    )
}

export default ProductDescriptionGroup