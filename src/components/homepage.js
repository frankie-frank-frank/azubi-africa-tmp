import { useState, useEffect } from "react";
import data from "../data.json";

export default function HomePage() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");

    useEffect(() => {
        function pickRandomProduct() {
            const randomIndex = Math.floor(Math.random() * data.length);
            const product = data[randomIndex];
            setProductName(product.name);
            setProductDescription(product.description);
            setProductImageUrl(product.image.desktop);
        }

        pickRandomProduct(); // initial pick

        const interval = setInterval(() => {
            pickRandomProduct();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="homepage-container">
            <div className="homepage-info">
                <p>NEW PRODUCT</p>
                <p style={{ fontWeight: "bold", fontSize: "2rem" }}>{productName}</p>
                <p>{productDescription}</p>
                <button>SEE PRODUCT</button>
            </div>
            <div className="homepage-image">
                <img src={productImageUrl} alt="Homepage Carousel Product"/>
            </div>
        </div>
    );
}