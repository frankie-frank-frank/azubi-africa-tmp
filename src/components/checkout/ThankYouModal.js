import { useEffect } from 'react'
import { popupModalWrapper, commaSeparatedPrice } from '../../helpers';
import dataList from "../../data.json"
import { useNavigate } from 'react-router-dom';
import { useWindowWidth } from "../../custom-hooks"

function ThankYouModal({ open, onClose, cartList }) {
    const navigate = useNavigate()
    const width = useWindowWidth();
    const isMobile = width < 768;

    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => {
            if (cartList.length > 0) {
                cartList.forEach(item => {
                    const key = Object.keys(item)[0];
                    if (key) localStorage.removeItem(key);
                });
            }
        }, 5000);
        window.dispatchEvent(new Event("cart-updated"));
        return () => clearTimeout(timer);
    }, [open, cartList]);

    if (!open) return null;

    const slugList = dataList.map(item => ({slug: item.slug, id: item.id}));
    if (!slugList) return [];

    if (cartList.length === 0) return;

    const productShown = Object.values(cartList[0])[0]
    const total = cartList.reduce((sum, itemInput) => {
        const item = Object.values(itemInput)[0];
        return sum + item.price * item.quantity;
    }, 0)

    const vatValue = Math.round(total * 0.2)

    const wrapperDeviceStyles = isMobile ? { ...popupModalWrapper, padding: "0px", width: "100%", justifyContent: "center"} : {popupModalWrapper}
    return (
        <div style={wrapperDeviceStyles} onClick={onClose}>
            <div 
                style={{
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "32px",
                    minWidth: "350px",
                    minHeight: "200px",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
                    position: "absolute",
                    top: "20%",
                    left: isMobile ? "" : "33%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    gap: "30px",
                    margin: "20px"
                }}
                onClick={e => e.stopPropagation()}
            >
                <img 
                    src='/assets/checkout/icon-order-confirmation.svg' 
                    alt='Order confirmation'
                    style={{
                        width: "50px",
                        height: "50px"
                    }}
                />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "30px",
                }}>
                    <h2 style={{maxWidth: "90%", textAlign: "start"}}>THANK YOU FOR YOUR ORDER</h2>
                    <p style={{opacity: "50%", margin: "0px"}}>You will receive an email confirmation shortly.</p>
                    <div style={{ display: "flex" }}>
                        <div 
                            style={{
                                background: "#f1f1f1", 
                                borderLeft: "1px solid #f1f1f1", 
                                borderTopLeftRadius: "12px", 
                                borderBottomLeftRadius: "12px", 
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                                width: "50%"
                            }}
                        >
                            <div style={{display: "flex", justifyContent: "center", alignItems: "start", gap: "10px"}}>
                                <img src={productShown.image.desktop.replace("./", "/")} alt={productShown.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: 4 }} />
                                <div style={{ width: "75%", display: "flex", alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                                    <p style={{ fontWeight: "bold", margin: 0, textAlign: "start" }}>{productShown.name}</p>
                                    <p style={{ margin: 0, textAlign: "start", fontSize: "12px", opacity: "50%" }}>${commaSeparatedPrice(String(productShown.price))}</p>
                                </div>
                                <div style={{display: "flex", justifyContent: "start", opacity: "50%"}}>x{productShown.quantity}</div>
                            </div>
                            <hr 
                                style={{
                                    border: "none",
                                    height: "0.5px",
                                    width: "100%",
                                    margin: "0 auto",
                                    opacity: "8%",
                                    background: "#000000"
                                }}
                            />
                            <p style={{ margin: 0, opacity: "50%", fontSize: "12px", textAlign: "center"}}>and {cartList.length - 1} other items{cartList.length > 1 && "(s)"}</p>
                        </div>
                        <div style={{
                            background: "#000",
                            borderRight: "1px solid #f1f1f1", 
                            borderTopRightRadius: "12px", 
                            borderBottomRightRadius: "12px", 
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: 'start',
                            padding: "0px 20px",
                            gap: "10px"
                        }}>
                            <p style={{color: "#fff", opacity: "50%", margin: 0}}>GRAND TOTAL</p>
                            <p style={{color: "#fff", margin: 0}}>$ {commaSeparatedPrice(String(total + 50 + vatValue))}</p>
                        </div>
                    </div>
                    <button 
                        style={{
                            background: "#d87d4a",
                            border: "none",
                            padding: "10px 0px",
                            borderRadius: "5px",
                            color: "#FFF",
                            cursor: "pointer",
                            opacity: 1,
                            width: "100%"
                        }}
                        onClick={() => navigate("/")}
                    >
                        BACK TO HOME
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ThankYouModal;