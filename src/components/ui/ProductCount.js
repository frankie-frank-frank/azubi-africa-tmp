import React from 'react'

function ProductCount({onDecrease, onIncrease, item, style={}}) {
  if(!item) return null;
    return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F1F1F1", height: "100%", justifyContent: "center", width: "120px", ...style }}>
        <button onClick={() => onDecrease(item.id)} style={{ padding: "2px 8px", background: "#F1F1F1", border: "none", flex: 1, height: "100%", cursor: "pointer" }}>-</button>
        <span style={{ flex: 1, textAlign: "center" }}>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)} style={{ padding: "2px 8px", background: "#F1F1F1", border: "none", flex: 1, height: "100%", cursor: "pointer" }}>+</button>
    </div>
  )
}

export default ProductCount