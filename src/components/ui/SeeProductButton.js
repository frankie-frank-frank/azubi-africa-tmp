import React, { useState } from "react";
import { useWindowWidth } from "../../custom-hooks"

export default function SeeProductButton({ onClick, style = {}, children = "SEE PRODUCT", slug }) {
    const [hovered, setHovered] = useState(false);
    const width = useWindowWidth();
    const isMobile = width < 768;

    return (
        <button
            style={{
                background: hovered ? "#000" : "#efefef",
                color: hovered ? "#fff" : "#000",
                border: "1px solid black",
                padding: "16px 32px",
                fontSize: isMobile ? "0.5rem" : "1rem",
                fontWeight: "bold",
                borderRadius: "2px",
                letterSpacing: "2px",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                ...style
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}