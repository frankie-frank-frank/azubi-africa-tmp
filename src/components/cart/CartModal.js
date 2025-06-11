import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCount from "../ui/ProductCount";

export default function CartModal({ open, onClose, cartItems, onIncrease, onDecrease, onRemove }) {
    const navigate = useNavigate();

    if (!open) return null;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "end",
            padding: "0px 200px",
            alignItems: "center",
            zIndex: 1000,
        }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "32px",
                    minWidth: "350px",
                    minHeight: "200px",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
                    position: "absolute",
                    top: 80
                }}
                onClick={e => e.stopPropagation()}
            >
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <h2 style={{ marginTop: 0, textAlign: "left" }}>CART ({cartItems.length})</h2>
                        <div>
                            {cartItems.map(item => (
                                <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                                    <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4, marginRight: 12 }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: "bold" }}>{item.name}</div>
                                        <div>${item.price} x {item.quantity}</div>
                                    </div>
                                    <ProductCount onDecrease={onDecrease} onIncrease={onIncrease} item={item} />
                                </div>
                            ))}
                            <div style={{ borderTop: "1px solid #eee", paddingTop: 16, marginTop: 16, display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontWeight: "bold" }}>TOTAL</span>
                                <span style={{ fontWeight: "bold" }}>${total}</span>
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
                    </div>
                )}
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
            </div>
        </div>
    );
}