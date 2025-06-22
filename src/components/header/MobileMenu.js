import { useEffect } from 'react'
import { popupModalWrapper, commaSeparatedPrice } from '../../helpers';
import dataList from "../../data.json"
import { useNavigate } from 'react-router-dom';
import { useWindowWidth } from "../../custom-hooks"
import HomepageProductListing from '../homepage/HP-ProductListing';

function MobileMenu({ open, onClose }) {
    const width = useWindowWidth();
    const isMobile = width < 768;

    if (!open) return null;

    const slugList = dataList.map(item => ({slug: item.slug, id: item.id}));
    if (!slugList) return [];

    function pickEdgeLength() {
        if(width < 768) { return "120px" }
        else if(width > 768 && width < 1025) { return "150px" }
        else { return "200px"}
    }
    const wrapperDeviceStyles = isMobile ? { ...popupModalWrapper, padding: "0px", width: "100%", justifyContent: "center", zIndex: 100000, alignItems: "", top: "7%" } : {popupModalWrapper}
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
                    top: isMobile ? "" : "20%",
                    left: isMobile ? "" : "33%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    gap: "30px",
                    margin: isMobile ? "0px" : "20px",
                    width: isMobile ? "100%" : ""
                }}
                onClick={e => e.stopPropagation()}
            >
                <HomepageProductListing 
                    stylesVal={{alignItems: "center", margin: "20px 0px", gap: "50px"}}
                    configs={{
                        imageWidthOverride: pickEdgeLength(),
                        imageClassOverride: {top: -40},
                        liClassOverride: {width: "100%", "min-height": "180px"}
                    }}
                    optionalCloseHandler={onClose}
                />
            </div>
        </div>
    )
}

export default MobileMenu;