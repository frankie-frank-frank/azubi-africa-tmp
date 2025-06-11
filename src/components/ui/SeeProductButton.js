import React, { useState } from "react";

export default function SeeProductButton({ onClick, style = {}, children = "SEE PRODUCT", slug }) {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            style={{
                background: hovered ? "#000" : "#efefef",
                color: hovered ? "#fff" : "#000",
                border: "1px solid black",
                padding: "16px 32px",
                fontSize: "1rem",
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