import dataList from "../../data.json"
import AltSeeProductButton from "../ui/AltSeeProductButton";
import HomepageProductListing from "../homepage/HP-ProductListing";
import ProductDescriptionGroup from "../homepage/HP-ProductDescriptionGroup";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../custom-hooks"

export default function ProductCategoryPage({ type }) {
  const filteredDataList = dataList.filter(item => item.category === type)
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <div>
      <div style={{
        background: "#000",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 200px",
        color: "#fff",
      }}>
        <h2 style={{ textTransform: "uppercase", color: "#fff"}}>{type}</h2>
      </div>
      <ul className="pcp-sect-one">
        {
          filteredDataList.map((filteredData, index) => {
            const isEven = filteredData.id % 2 === 0;
            const imageElement = (
              <img 
                src={filteredData.image.desktop} 
                alt="Product Category Item" 
                style={{
                  width: isMobile ? "100%" : "30%",
                  borderRadius: "10px"
                }}
              />
            )
            const descElement = (
              <div style={{
                width: isMobile ? "100%" : "48%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "start", 
                justifyContent: "center", 
                gap: "2px"
              }}>
                { filteredData.new ? <p style={{ color: "#d87d4a", width: "100%"}} className="overline">NEW PRODUCT</p> : <></> }
                <h1 style={{ 
                  fontSize: isMobile ? "1.6rem" : "3rem", 
                  fontWeight: "bold", 
                  margin: 0, 
                  lineHeight: 1.1, 
                  textAlign: isMobile ? "center" : "start",
                  width: "100%"
                }}>{filteredData.name}</h1>
                <p style={{ textAlign: isMobile ? "center" : "start", opacity: "0.5"}}>{filteredData.description}</p>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                  <AltSeeProductButton onClickFn={() => navigate(`/product/${filteredData.id}`)}/>
                </div>
              </div>
            );
            return (
              <li 
                key={filteredData.id}
                style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "20px" : "10%"}}
              >
                {!isMobile && isEven && (
                  <>
                    {imageElement}
                    {descElement}
                  </>
                )}
                {!isMobile && !isEven && (
                  <>
                    {descElement}
                    {imageElement}
                  </>
                )}
                {
                  isMobile && (
                    <>
                      {imageElement}
                      {descElement}
                    </>
                  )
                }
              </li>
            )
          })
        }
      </ul>
      <HomepageProductListing stylesVal={{marginTop: "170px"}}/>
      <ProductDescriptionGroup />
    </div>
  );
}