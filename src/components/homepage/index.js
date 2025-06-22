import { useState, useEffect } from "react";
import data from "../../data.json";
import HomepageProductListing from "./HP-ProductListing";
import HomepageProductSamples from "./HP-ProductSamples";
import HomepageProductDescriptionGroup from "./HP-ProductDescriptionGroup";
import { useNavigate } from "react-router-dom";
import AltSeeProductButton from "../ui/AltSeeProductButton";
import { useWindowWidth } from "../../custom-hooks"
import FillDots from "./FillDots";

export default function HomePage() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");
    const [productId, setProductId] = useState("");

    const navigate = useNavigate();
    const width = useWindowWidth();
    const isMobile = width < 768;

    const homepageContainerClass = isMobile ? "homepage-container-mobile" : "homepage-container";
    const homepageInfoClass = isMobile ? "homepage-info-mobile" : "homepage-info";
    const homepageImageClass = isMobile ? "homepage-image-mobile" : "homepage-image";
    const homepageImageElementClass = isMobile ? "homepage-image-element-mobile" : "homepage-image-element"

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
        <>
            <div className={homepageContainerClass}>
                <div className={homepageInfoClass}>
                    <p className="overline" style={{opacity: 0.4}}>NEW PRODUCT</p>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <AltSeeProductButton onClickFn={() => navigate(`/product/${productId}`)}/>
                    <FillDots index={parseInt(productId)} total={data.length} />
                </div>
                <div className={homepageImageClass}>
                    <img src={productImageUrl} alt="Homepage Carousel Product" className={homepageImageElementClass} />
                </div>
            </div>
            <HomepageProductListing />
            <HomepageProductSamples />
            <HomepageProductDescriptionGroup />
        </>
    );
}