import React from 'react'

function SubTotalField({data, name}) {
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", opacity: "50%", width: "100%"}}>
      <p style={{margin: "0px"}}>{name}</p>
      <p>{data}</p>
    </div>
  )
}

export default SubTotalField