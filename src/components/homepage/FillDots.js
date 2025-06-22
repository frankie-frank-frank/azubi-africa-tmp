import React from 'react'
import { useWindowWidth } from "../../custom-hooks"

function FillDots({ index:inputIndex, total}) {
    const width = useWindowWidth();
    const isMobile = width < 768;
    
    const handleBackgroundColor = (activeIndex) => {
        if(activeIndex) {
            return "#D87D4A"
        } else {
            return "#fff"
        }
    }
    
    const chooseBorderColor = (activeIndex) => {
        if(activeIndex) {
            return "#D87D4A"
        } else {
            return "#000"
        }
    }

    return (
        <ul style={{display: "flex", gap: "15px", width: "100%", justifyContent: isMobile ? "center" : "flex-start", alignItems: "center", paddingLeft: "0px"}}>
            {
                Array.from({ length: total}).fill(1).map((_, index) => (
                    <li 
                        style={{ 
                            width: "10px", 
                            height: "10px", 
                            borderRadius: "100%", 
                            listStyle: "none", 
                            backgroundColor: handleBackgroundColor(index === inputIndex-1),
                            border: `1px solid ${chooseBorderColor(index === inputIndex-1)}`
                        }}
                    ></li>            
                ))
            }
        </ul>
    )
}

export default FillDots