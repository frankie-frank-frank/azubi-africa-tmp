import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dataList from "../../data.json"
import AltSeeProductButton from "../ui/AltSeeProductButton";
import ProductCount from "../ui/ProductCount";
import HomepageProductListing from "../homepage/HP-ProductListing";
import HomepageProductDescriptionGroup from "../homepage/HP-ProductDescriptionGroup";
import { commaSeparatedPrice, splitAfterDotEvery300Chars } from "../../helpers";
import { useWindowWidth } from "../../custom-hooks"

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;

  const [hoverGoBack, setHoverGoBack] = useState(false);
  
  const [filteredData, setFilteredData] = useState(() => dataList.find(item => (item.id === parseInt(id) || item.slug === id)))

  const [cartItem, setCartItem] = useState(() => {
    if (!filteredData) return {};
    const key = `product-detail-${filteredData.slug}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      return { quantity: 0, id: filteredData.id, price: filteredData.price, image: filteredData.image, name: filteredData.name };
    }
  });

  const handleIncrease = () => setCartItem(prev => {
    return { ...prev, quantity: prev.quantity + 1 }
  });

  const handleDecrease = () => setCartItem(prev => {
    return prev.quantity > 0 ? { ...prev, quantity: prev.quantity - 1 } : prev
  });

  useEffect(() => {
    function syncCartItem() {
      const filteredData = dataList.find(item => (item.id === parseInt(id) || item.slug === id))
      if (!filteredData) return;
      setFilteredData(prev => filteredData);
      const key = `product-detail-${filteredData.slug}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        setCartItem(JSON.parse(stored));
      } else {
        setCartItem({ quantity: 0, id: filteredData.id, price: filteredData.price, image: filteredData.image, name: filteredData.name });
      }
    }
    window.addEventListener("cart-updated", syncCartItem);
    return () => window.removeEventListener("cart-updated", syncCartItem);
  }, [id])

  return (
    <div className="pdp-wrapper">
      <div style={{ display: "flex"}}> 
        <button
          style={{ 
            opacity: hoverGoBack ? "1" : "0.5", 
            background: "none",
            border: "none", 
            cursor: "pointer", 
            fontSize: "16px",
            color: hoverGoBack ? "#d87d4a" : "inherit",
            transition: "color 0.2s",
            width: "200px",
            padding: "0px",
            textAlign: "left",
            marginTop: isMobile ? "30px" : "0px",
            marginLeft: isMobile ? "5px" : "0px"
          }}
          onClick={() => navigate(-1)}
          onMouseEnter={() => setHoverGoBack(true)}
          onMouseLeave={() => setHoverGoBack(false)}
        >
          Go Back
        </button>
      </div>
      <div className="pdp-sect-one">
        <img 
          src={filteredData?.image.desktop.replace('./', '/')} 
          alt="Product Category Item" 
          style={{
            width: isMobile ? "100%" : "50%",
            borderRadius: "15px",
          }}
        />
        <div className="pdp-sect-one-product-description-sect">
          {filteredData.new ? <p style={{ color: "#d87d4a"}} className="overline">NEW PRODUCT</p> : <></>}
          <h1 style={{ 
            fontSize: "3rem", 
            fontWeight: "bold",
            margin: 0,
            lineHeight: 1.1,
            textAlign: "start"
          }}>{filteredData?.name}</h1>
          <p style={{ textAlign: "start", opacity: "0.5"}}>{filteredData?.description}</p>
          <p style={{ textAlign: "start", fontWeight: "bolder"}}>$ {commaSeparatedPrice(String(filteredData.price))}</p>
          <div style={{display: "flex", alignItems: "center", justifyContent: "start", gap: "5%", width: "100%", height: "42px", paddingTop: "20px"}}>
            <ProductCount onDecrease={handleDecrease} onIncrease={handleIncrease} item={cartItem}/>
            <AltSeeProductButton 
              text="ADD TO CART"
              onClickFn={() => {
                const key = `product-detail-${filteredData.slug}`;
                if(cartItem.quantity > 0) { 
                  localStorage.setItem(key, JSON.stringify(cartItem)); 
                  window.dispatchEvent(new Event("cart-updated"));
                }
                else if(cartItem.quantity === 0) localStorage.removeItem(key)
              }}
            />
          </div>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: isMobile ? "90px": "120px", marginTop: "50px"}}>
        <div style={{display: "flex", width: "100%", gap: isMobile ? "30px" : "10%", flexDirection: isMobile ? "column" : "row"}}>
          <div style={{ width: isMobile ? "100%" : "57%"}}>
            <h1 style={{ 
              fontSize: "25px", 
              fontWeight: "bold",
              opacity: "0.88",
              margin: 0,
              lineHeight: 1.1,
              textAlign: "start"
            }}>
              FEATURES
            </h1>
            <div style={{ display: "flex", flexDirection: "column"}}>
              {
                splitAfterDotEvery300Chars(filteredData.features).map(chunk => (
                  <p style={{textAlign: "start", fontSize: "14px", color: "#000", opacity: "0.45"}}>{chunk}</p>
                ))
              }
            </div>
          </div>
          <div style={{ width: isMobile ? "100%" : "30%" }}>
            <h1 style={{ 
              fontSize: "25px", 
              fontWeight: "bold",
              opacity: "0.88",
              margin: 0,
              lineHeight: 1.1,
              textAlign: "start",
              padding: "0px"
            }}>IN THE BOX</h1>
            <ul style={{ position: 'relative', listStyle: "none", padding: "0px" }}>{
              filteredData.includes.map(item => {
                return (
                  <li
                    key={item.name}
                    style={{
                      textAlign: "center",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      width: "100vw",
                      boxSizing: "border-box"
                    }}
                  >
                    <p 
                      style={{
                        color: "#d87d4a",
                        marginTop: "12px",
                        fontWeight: "bolder",
                        fontSize: "12px",
                        letterSpacing: "2px"
                      }}
                    >
                      {item.quantity}x
                    </p>
                    <p 
                      style={{
                        color: "#000",
                        marginTop: "12px",
                        textTransform: "uppercase",
                        fontWeight: "bolder",
                        fontSize: "12px",
                        letterSpacing: "2px"
                      }}
                    >
                      {item.item}
                    </p>
                  </li>
                )
              })
            }
            </ul>
          </div>
        </div>
        <div style={{display: "flex", width: "100%", gap: isMobile ? "8px": "5%", height: isMobile ? "100%": "592px", flexDirection: isMobile ? "column" : "row"}}>
          <div style={{display: "flex", flexDirection: "column", gap: isMobile ? "8px": "2%", width: isMobile ? "100%": "45%", height: "100%"}}>
            <img style={{
              height: "49%",
              borderRadius: "12px",
              objectFit: "cover"
            }} src={filteredData.gallery.first.desktop.replace("./", "/")} alt="First Gallery"/>
            <img style={{
              height: "49%",
              borderRadius: "12px",
              objectFit: "cover"
            }} src={filteredData.gallery.second.desktop.replace("./", "/")} alt="Second Gallery"/>
          </div>
          <div style={{width: isMobile ? "100%": "50%", height: "100%"}}>
            <img style={{
              borderRadius: "12px",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }} src={filteredData.gallery.third.desktop.replace("./", "/")} alt="Second Gallery"/>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "40px"}}>
            <h1 style={{ 
              fontSize: isMobile ? "25px": "32px", 
              fontWeight: "bold",
              margin: 0,
              letterSpacing: "1.14px",
              lineHeight: 1.1,
              textAlign: isMobile ? "center": "start",
              width: "100%"
            }}>YOU MAY ALSO LIKE</h1>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? "40px": "20px", flexDirection: isMobile ? "column": "row" }}>
              {
                filteredData.others.map(otherOpt => (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "start", gap: "18px"}}>
                    <img 
                      style={{
                        borderRadius: "12px",
                        width: "100%"
                      }} 
                      src={otherOpt.image.desktop.replace("./", "/")} alt="Second Gallery" 
                    />
                    <h1>{otherOpt.name}</h1>
                    <AltSeeProductButton onClickFn={() => { navigate(`/product/${otherOpt.slug}`); navigate(`/product/${otherOpt.slug}`);window.location.reload();}}/>
                  </div>
                ))
              }
            </div>
        </div>
        <HomepageProductListing stylesVal={{padding: "0px", height: isMobile ? "100%" : "250px", margin: "0px", marginTop: "100px"}}/>
        <HomepageProductDescriptionGroup  stylesVal={{padding: "0px", marginTop: "0px"}}/>
      </div>
    </div>
  );
}