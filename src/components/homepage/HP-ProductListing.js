import { useNavigate } from "react-router-dom";

export default function HomepageProductListing({stylesVal = {}}) {
    const headphone = {
        name: "HEADPHONES",
        path: "/headphones",
        image: "/assets/shared/desktop/image-category-thumbnail-headphones.png"
    }
    const speaker = {
        name: "SPEAKERS",
        path: "/speakers",
        image: "/assets/shared/desktop/image-category-thumbnail-speakers.png"
    }
    const earphone = {
        name: "EARPHONES",
        path: "/earphones",
        image: "/assets/shared/desktop/image-category-thumbnail-earphones.png"
    }
    
    const itemsList = [headphone, speaker, earphone];

    const navigate = useNavigate();
    return (
        <ul className="homepage-row" style={{ display: "flex", justifyContent: "center", gap: "40px", padding: "40px 200px", position: 'relative', listStyle: "none", margin: "80px 0px", ...stylesVal }}>
            {itemsList.map(item => 
                <li
                    key={item.name}
                    style={{
                        textAlign: "center",
                        position: "relative",
                        minWidth: "180px",
                        minHeight: "200px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        borderRadius: "8px",
                        paddingTop: "80px",
                        background: "#f1f1f1",
                        padding: "20px 20px",
                        width: "100vw",
                        boxSizing: "border-box"
                    }}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{
                            position: "absolute",
                            top: -90,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "200px",
                            height: "200px",
                            objectFit: "contain"
                        }}
                    />
                    <p style={{
                        color: "#000",
                        marginTop: "12px",
                        textTransform: "uppercase",
                        fontWeight: "bolder",
                        fontSize: "12px",
                        letterSpacing: "2px"
                    }}>{item.name}</p>
                    <button 
                        className="shop-btn"
                        onClick={() => navigate(item.path)}
                    >
                        SHOP
                        <img src="/assets/shared/desktop/icon-arrow-right.svg" alt="Right Icon" style={{ width: "12px", height: "12px" }} />
                    </button>
                </li>
            )}
        </ul>
    )
}