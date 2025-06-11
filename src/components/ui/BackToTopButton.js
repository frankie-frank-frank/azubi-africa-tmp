import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    visible && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          right: "40px",
          bottom: "40px",
          background: "#000",
          border: "none",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1000,
          transition: "background 0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#d87d4a")}
        onMouseLeave={e => (e.currentTarget.style.background = "#000")}
        aria-label="Back to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 6L6 12H18L12 6Z" fill="#fff"/>
        </svg>
      </button>
    )
  );
}