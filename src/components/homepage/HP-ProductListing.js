import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../custom-hooks"

export default function HomepageProductListing({stylesVal = {}, configs = {}, optionalCloseHandler}) {
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

    const width = useWindowWidth();
    const isMobile = width < 768;

    const homepageRowStyle = isMobile ? "homepage-row-mobile" : "homepage-row"
    const homepageRowLiElementStyle = isMobile ? "homepage-row-li-element-mobile" : "homepage-row-li-element"
    
    const navigate = useNavigate();

    return (
        <ul className={homepageRowStyle} style={{ ...stylesVal }} onClick={optionalCloseHandler??""}>
            {itemsList.map(item => 
                <li
                    key={item.name}
                    className={homepageRowLiElementStyle}
                    style={{ ...configs?.liClassOverride }}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{
                            position: "absolute",
                            top: -90,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: configs?.imageWidthOverride ?? "200px",
                            height: configs?.imageWidthOverride ?? "200px",
                            objectFit: "contain",
                            ...configs?.imageClassOverride
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