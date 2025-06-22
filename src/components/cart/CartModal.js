import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCount from "../ui/ProductCount";
import { commaSeparatedPrice, popupModalWrapper } from "../../helpers";
import { useWindowWidth } from "../../custom-hooks"

export default function CartModal({ open, onClose, cartItems, setCartItems, setTotalCartQuantity }) {
    const navigate = useNavigate();
    const width = useWindowWidth();
    const isMobile = width < 768;

    if (!open) return null;

    const total = cartItems.reduce((sum, itemInput) => {
        const item = Object.values(itemInput)[0];
        return sum + item.price * item.quantity;
    }, 0);

    const emptyCartRestyling = cartItems.length === 0 ? { display: "flex", justifyContent: "center", alignItems: "center"} : {}
    const pickImageType = (image) => {
        if(width < 767) {
            return image.mobile
        } else if(width > 767 && width < 1025) {
            return image.tablet
        } else {
            return image.desktop
        }
    }

    const mobileWrapperStyle = isMobile ? { width: "100%", padding: "0px", justifyContent: "center", zIndex: 100000 } : {}
    return (
        <div style={{...popupModalWrapper, ...mobileWrapperStyle}} onClick={onClose}>
            <div
                style={{
                    background: "#fff",
                    borderRadius: "8px",
                    padding: isMobile ? "20px" : "32px",
                    minWidth: "350px",
                    minHeight: "200px",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
                    position: "absolute",
                    top: isMobile ? "120px" : 80,
                    ...emptyCartRestyling
                }}
                onClick={e => e.stopPropagation()}
            >
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10}}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <h4 style={{ marginTop: 0, textAlign: "left" }}>CART ({cartItems.length})</h4>
                            <button
                                style={{ background: "none", border: "none", cursor: "pointer"}}
                                onClick={() => {
                                    cartItems.forEach(itemInput => {
                                        const key = Object.keys(itemInput)[0];
                                        localStorage.removeItem(key)
                                    });
                                    setCartItems([])
                                    setTotalCartQuantity(0)
                                }}
                            >
                                <p style={{ opacity: 0.5, textDecoration: "underline"}}>Remove all</p>                            
                            </button>
                        </div>
                        <div>
                            {cartItems.map(itemInput => {
                                const item = Object.values(itemInput)[0];
                                const key = Object.keys(itemInput)[0];

                                const handleIncrease = () => {
                                    const updatedItem = { ...item, quantity: item.quantity + 1 };
                                    setCartItems(prev =>
                                        prev.map(ci => {
                                            if(Object.values(ci)[0].id === item.id) {
                                                if (updatedItem.quantity > 0) {
                                                    localStorage.setItem(key, JSON.stringify(updatedItem));
                                                } else {
                                                    localStorage.removeItem(key)
                                                }
                                                window.dispatchEvent(new Event("cart-updated"));
                                                return {[key]: updatedItem }
                                            } else { return ci}
                                        })
                                    );
                                    setTotalCartQuantity((cartItems.reduce((sum, itemInput) => {
                                        const item = Object.values(itemInput)[0];
                                        return sum + (item.quantity || 0);
                                    }, 0)))
                                };

                                const handleDecrease = () => {
                                    const updatedItem = { ...item, quantity: Math.max(0, item.quantity - 1) };
                                    setCartItems(prev =>
                                        prev.map(ci => {
                                            if(Object.values(ci)[0].id === item.id) {
                                                if (updatedItem.quantity > 0) {
                                                    localStorage.setItem(key, JSON.stringify(updatedItem));
                                                }else {
                                                    localStorage.removeItem(key)
                                                }
                                                window.dispatchEvent(new Event("cart-updated"));
                                                return {[key]: updatedItem }
                                            } else { return ci}
                                        })
                                    );
                                    setTotalCartQuantity((cartItems.reduce((sum, itemInput) => {
                                        const item = Object.values(itemInput)[0];
                                        return sum + (item.quantity || 0);
                                    }, 0)))
                                };
                                return (
                                    <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "16px", gap: "4%", justifyContent: "center" }}>
                                        <div style={{width: "18%"}}>
                                            <img src={pickImageType(item.image).replace("./", "/")} alt={item.name} style={{ width: 60, objectFit: "cover", borderRadius: 4, marginRight: 12 }} />
                                        </div>
                                        <div style={{ width: "55%" }}>
                                            <p style={{ fontWeight: "bold", margin: 0, textAlign: "start" }}>{item.name}</p>
                                            <p style={{ margin: 0, textAlign: "start" }}>${commaSeparatedPrice(String(item.price))}</p>
                                        </div>
                                        <ProductCount 
                                            onDecrease={handleDecrease} 
                                            onIncrease={handleIncrease} 
                                            item={item} 
                                            style={{width: "27%"}}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ borderTop: "1px solid #eee", paddingTop: 16, marginTop: 16, display: "flex", justifyContent: "space-between" }}>
                            <span style={{ opacity: 0.5}}>TOTAL</span>
                            <span style={{ fontWeight: "bold" }}>$ {commaSeparatedPrice(String(total))}</span>
                        </div>
                        <button
                            style={{
                                marginTop: 24,
                                width: "100%",
                                background: "#d87d4a",
                                color: "#fff",
                                border: "none",
                                padding: "12px 0",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                onClose();
                                navigate("/checkout");
                            }}
                        >
                            CHECKOUT
                        </button>
                    </div>
                )}
                {
                    isMobile 
                    ? <></> 
                    : (
                        <button
                            onClick={onClose}
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                background: "none",
                                border: "none",
                                fontSize: "1.5rem",
                                color: "#888",
                                cursor: "pointer"
                            }}
                            aria-label="Close"
                        >×</button>
                    )
                }
            </div>
        </div>
    );
}