import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dataList from "../../data.json"
import AltSeeProductButton from "../ui/AltSeeProductButton";
import ProductCount from "../ui/ProductCount";
import HomepageProductListing from "../homepage/HP-ProductListing";
import HomepageProductDescriptionGroup from "../homepage/HP-ProductDescriptionGroup";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoverGoBack, setHoverGoBack] = useState(false);
  
  const filteredData = dataList.find(item => (item.id === parseInt(id) || item.slug === id));

  const [cartItem, setCartItem] = useState(() => {
    if (!filteredData) return {};
    const key = `product-detail-${filteredData.slug}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      const initial = { quantity: 0, id: filteredData.id };
      return initial;
    }
  });

  const handleIncrease = () => setCartItem(prev => {
    return { ...prev, quantity: prev.quantity + 1 }
  });

  const handleDecrease = () => setCartItem(prev => {
    return prev.quantity > 0 ? { ...prev, quantity: prev.quantity - 1 } : prev
  });

  function splitAfterDotEvery300Chars(text) {
    const result = [];
    let start = 0;

    while (start < text.length) {
      let searchFrom = start + 300;

      if (searchFrom >= text.length) {
        result.push(text.slice(start).trim());
        break;
      }
      let dotIndex = text.indexOf('.', searchFrom);
      if (dotIndex === -1) {
        result.push(text.slice(start).trim());
        break;
      }

      result.push(text.slice(start, dotIndex + 1).trim());
      start = dotIndex + 1;
    }

    return result;
  }

  return (
    <div style={{ padding: "0px 200px", margin: "50px 0px"}}>
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
            textAlign: "left"
          }}
          onClick={() => navigate(-1)}
          onMouseEnter={() => setHoverGoBack(true)}
          onMouseLeave={() => setHoverGoBack(false)}
        >
          Go Back
        </button>
      </div>
      <div style={{
        margin: "30px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "10%",
        width: "100%"
      }}>
        <img 
          src={filteredData?.image.desktop.replace('./', '/')} 
          alt="Product Category Item" 
          style={{
            width: "50%"
          }}
        />
        <div style={{
          width: "40%", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "start", 
          justifyContent: "center", 
          gap: "2px"
        }}>
          {filteredData.new ? <p style={{ color: "#d87d4a"}}>NEW PRODUCT</p> : <></>}
          <h1 style={{ 
            fontSize: "3rem", 
            fontWeight: "bold",
            margin: 0,
            lineHeight: 1.1,
            textAlign: "start"
          }}>{filteredData?.name}</h1>
          <p style={{ textAlign: "start", opacity: "0.5"}}>{filteredData?.description}</p>
          <p style={{ textAlign: "start", fontWeight: "bolder"}}>$ {filteredData.price}</p>
          <div style={{display: "flex", alignItems: "center", justifyContent: "start", gap: "5%", width: "100%", height: "42px", paddingTop: "20px"}}>
            <ProductCount onDecrease={handleDecrease} onIncrease={handleIncrease} item={cartItem}/>
            <AltSeeProductButton 
              text="ADD TO CART"
              onClickFn={() => {
                const key = `product-detail-${filteredData.slug}`;
                if(cartItem.quantity > 0) localStorage.setItem(key, JSON.stringify(cartItem));
                else if(cartItem.quantity === 0) localStorage.removeItem(key)
              }}
            />
          </div>
        </div>
      </div>
      <div style={{display: "flex", width: "100%", marginTop: "120px", gap: "10%"}}>
        <div style={{ width: "57%"}}>
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
                <p style={{textAlign: "start", fontSize: "14px", color: "#b4b4b4"}}>{chunk}</p>
              ))
            }
          </div>
        </div>
        <div style={{ width: "30%" }}>
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
      <div style={{display: "flex", width: "100%", marginTop: "120px", gap: "5%"}}>
        <div style={{display: "flex", flexDirection: "column", gap: "14px", width: "50%"}}>
          <img style={{
            height: "50%",
            borderRadius: "12px"
          }} src={filteredData.gallery.first.desktop.replace("./", "/")} alt="First Gallery"/>
          <img style={{
            height: "50%",
            borderRadius: "12px"
          }} src={filteredData.gallery.second.desktop.replace("./", "/")} alt="Second Gallery"/>
        </div>
        <div>
          <img style={{
            width: "635px",
            height: "592px",
            borderRadius: "12px"
          }} src={filteredData.gallery.third.desktop.replace("./", "/")} alt="Second Gallery"/>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",  marginTop: "120px", gap: "40px"}}>
          <h1 style={{ 
            fontSize: "32px", 
            fontWeight: "bold",
            margin: 0,
            letterSpacing: "1.14px",
            lineHeight: 1.1,
            textAlign: "start",
            width: "100%"
          }}>YOU MAY ALSO LIKE</h1>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "20px"}}>
            {
              filteredData.others.map(otherOpt => (
                <div >
                  <img 
                    style={{
                      borderRadius: "12px",
                      width: "100%"
                    }} 
                    src={otherOpt.image.desktop.replace("./", "/")} alt="Second Gallery" 
                  />
                  <h1>{otherOpt.name}</h1>
                  <AltSeeProductButton onClickFn={() => navigate(`/product/${otherOpt.slug}`)}/>
                </div>
              ))
            }
          </div>
      </div>
      <div style={{marginTop: "200px"}}>
        <HomepageProductListing stylesVal={{padding: "0px", height: "250px"}}/>
      </div>
      <div style={{marginTop: "200px"}}>
        <HomepageProductDescriptionGroup  stylesVal={{padding: "0px"}}/>
      </div>
    </div>
  );
}