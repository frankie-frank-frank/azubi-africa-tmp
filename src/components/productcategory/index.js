import dataList from "../../data.json"
import AltSeeProductButton from "../ui/AltSeeProductButton";
import HomepageProductListing from "../homepage/HP-ProductListing";
import ProductDescriptionGroup from "../homepage/HP-ProductDescriptionGroup";
import { useNavigate } from "react-router-dom";

export default function ProductCategoryPage({ type }) {
  const filteredDataList = dataList.filter(item => item.category === type)
  const navigate = useNavigate();
  
  return (
    <div>
      <div style={{
        background: "#181818",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 200px",
        color: "#fff",
      }}>
        <h2 style={{ textTransform: "uppercase", color: "#fff"}}>{type}</h2>
      </div>
      <ul style={{ 
        listStyle: "none", 
        padding: "0px 200px", 
        margin: "120px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "120px",
      }}>
        {
          filteredDataList.map((filteredData, index) => {
            const isEven = filteredData.id % 2 === 0;
            const imageElement = (
              <img 
                src={filteredData.image.desktop} 
                alt="Product Category Item" 
                style={{
                  width: "30%"
                }}
              />
            )
            const descElement = (
              <div style={{
                width: "48%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "start", 
                justifyContent: "center", 
                gap: "2px"
              }}>
                { filteredData.new ? <p style={{ color: "#d87d4a"}}>NEW PRODUCT</p> : <></> }
                <h1 style={{ 
                  fontSize: "3rem", 
                  fontWeight: "bold", 
                  margin: 0, 
                  lineHeight: 1.1, 
                  textAlign: "start" 
                }}>{filteredData.name}</h1>
                <p style={{ textAlign: "start", opacity: "0.5"}}>{filteredData.description}</p>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <AltSeeProductButton onClickFn={() => navigate(`/product/${filteredData.id}`)}/>
                </div>
              </div>
            );
            return (
              <li 
                key={filteredData.id}
                style={{ display: "flex", flexDirection: "row", gap: "10%"}}
              >
                {isEven ? (
                  <>
                    {imageElement}
                    {descElement}
                  </>
                ) : (
                  <>
                    {descElement}
                    {imageElement}
                  </>
                )}
              </li>
            )
          })
        }
      </ul>
      <HomepageProductListing />
      <ProductDescriptionGroup />
    </div>
  );
}