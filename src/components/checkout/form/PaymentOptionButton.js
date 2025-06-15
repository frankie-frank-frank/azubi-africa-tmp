import React from 'react'

function PaymentOptionButton({ textInput, isActiveButton, setPaymentOption }) {
  return (
    <div 
      style={{
        display: "flex", 
        gap: "10px", 
        justifyContent: "start", 
        alignItems: "center", 
        border: isActiveButton ? "1px solid #d87d4a" : "1px solid #CFCFCF", 
        borderRadius: "5px", 
        width: "100%", 
        height: "44px", 
        paddingLeft: "20px",
        cursor: "pointer"
      }}
      onClick={(e) => setPaymentOption(textInput)}
    >
      <input 
        type="radio"
        checked={isActiveButton}
        onChange={() => setPaymentOption(textInput)}
        style={{
          accentColor: "#d87d4a",
          width: "18px",
          height: "18px",
          margin: 0,
        }}
      />
      <p style={{fontWeight: "bold", fontSize: "12px", margin: "0px"}}>{textInput}</p>
    </div>
  )
}

export default PaymentOptionButton