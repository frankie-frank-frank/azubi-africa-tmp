import React from 'react'

function ProductDescriptionGroup({ stylesVal = {}}) {
  return (
    <div style={{
        padding: "0px 200px",
        height: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "100px 0px",
        position: "relative",
        overflow: "hidden",
        ...stylesVal
    }}>
        <div style={{
            textAlign: "left",
            width: "40%"
        }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: 0, lineHeight: 1.1 }}>BRINGING YOU THE <span style={{color: "#D87D4A"}}>BEST</span> AUDIO GEAR</h1>
            <p style={{ 
                opacity: 0.5, 
                textAlign: "left",
                lineHeight: 1.5
            }}>
                Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
            </p>
        </div>
        <div style={{
            width: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            borderRadius: "8px"
        }}>
            <img style={{borderRadius: "8px"}} src='/assets/shared/desktop/image-best-gear.jpg' alt="Best gear" />
        </div>
    </div>
  )
}

export default ProductDescriptionGroup