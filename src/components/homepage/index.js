import { useState, useEffect } from "react";
import data from "../../data.json";
import HomepageProductListing from "./HP-ProductListing";
import HomepageProductSamples from "./HP-ProductSamples";
import HomepageProductDescriptionGroup from "./HP-ProductDescriptionGroup";
import { useNavigate } from "react-router-dom";
import AltSeeProductButton from "../ui/AltSeeProductButton";

export default function HomePage() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");
    const [productId, setProductId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        function pickRandomProduct() {
            const randomIndex = Math.floor(Math.random() * data.length);
            const product = data[randomIndex];
            setProductName(product.name);
            setProductDescription(product.description);
            setProductImageUrl(product.image.desktop);
            setProductId(product.id)
        }

        pickRandomProduct();

        const interval = setInterval(() => {
            pickRandomProduct();
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    
    return (
        <div>
            <div className="homepage-container">
                <div className="homepage-info">
                    <p style={{opacity: 0.4}}>NEW PRODUCT</p>
                    <p style={{ fontWeight: "bold", fontSize: "2rem" }}>{productName}</p>
                    <p>{productDescription}</p>
                    <AltSeeProductButton onClickFn={() => navigate(`/product/${productId}`)}/>
                </div>
                <div className="homepage-image">
                    <img src={productImageUrl} alt="Homepage Carousel Product"/>
                </div>
            </div>
            <HomepageProductListing />
            <HomepageProductSamples />
            <HomepageProductDescriptionGroup />
        </div>
    );
}