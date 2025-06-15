import React from 'react'

function LongField({ textInput, placeholderText, style={}, setValue, value }) {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "start", flexDirection: "column", width: "100%", ...style}}>
      <p style={{fontWeight: "bold", fontSize: "12px", margin: "0px"}}>{textInput}</p>
      <input
        type="text" 
        style={{
          width: "100%", 
          height: "50px", 
          border: "1px solid #CFCFCF", 
          opacity: "50%", 
          borderRadius: "5px"
        }}  
        className="field-input" 
        placeholder={placeholderText}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default LongField