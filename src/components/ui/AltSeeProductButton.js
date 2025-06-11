import { useNavigate } from "react-router-dom"

export default function AltSeeProductButton({ onClickFn, text }) {
    return (
        <button className="alt-see-product-button" onClick={onClickFn}>{ text?? "SEE PRODUCT"}</button>
    )
}