import { commaSeparatedPrice } from "../../helpers"
import dataList from "../../data.json"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ThankYouModal from "./ThankYouModal";
import Field from "./form/Field";
import LongField from "./form/LongField";
import HSixHeader from "./form/HSixHeader";
import PaymentOptionButton from "./form/PaymentOptionButton";
import SubTotalField from "./form/SubTotalField";
import { useWindowWidth } from "../../custom-hooks"

export default function CheckoutPage() {

  const [hoverGoBack, setHoverGoBack] = useState(false);
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;

  const [billingName, setBillingName] = useState()
  const [emailAddress, setEmailAddress] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [shippingAddress, setShippingAddress] = useState()
  const [zipCode, setZipCode] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [paymentOption, setPaymentOption] = useState("Cash on Delivery")
  const [eMoneyNumber, setEMoneyNumber] = useState()
  const [eMoneyPin, setEMoneyPin] = useState();
  
  const [cartList] = useState(() => {
    const slugList = dataList.map(item => ({slug: item.slug, id: item.id}));
    if(slugList.length > 0) {
      const cartListTemp = []
      for(const slugItem of slugList) {
        const key = `product-detail-${slugItem.slug}`;
        const stored = localStorage.getItem(key);
        if (stored) {
          cartListTemp.push({ [key] : JSON.parse(stored)})
        }
      }
      return cartListTemp
    } else return []
  })

  const [isFormValid, setIsFormValid] = useState(false);
  const validLength = (input) => input && input.length > 0;

  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);

  useEffect(() => {
    const isBillingValid = validLength(billingName) && validLength(emailAddress) && validLength(phoneNumber);
    const isShippingValid = validLength(shippingAddress) && validLength(zipCode) && validLength(city) && validLength(country);
    const isEMoneyValid = paymentOption !== "e-Money" || (validLength(eMoneyNumber) && validLength(eMoneyPin));
    setIsFormValid(isBillingValid && isShippingValid && isEMoneyValid && cartList.length > 0)
  }, [billingName, emailAddress, phoneNumber, shippingAddress, zipCode, city, country, paymentOption, eMoneyNumber, eMoneyPin, cartList])

  useEffect(() => {
    if (thankYouModalOpen) {
      const timer = setTimeout(() => {
        setThankYouModalOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [thankYouModalOpen]);
  
  const total = cartList.reduce((sum, itemInput) => {
    const item = Object.values(itemInput)[0];
    return sum + item.price * item.quantity;
  }, 0)

  const vatValue = Math.round(total * 0.2)

  const handleCheckoutClick = (e) => {
    setThankYouModalOpen(true);
    if(cartList.length > 0) {
      cartList.forEach(item => {
        const key = Object.keys(item)[0]
        if(key) localStorage.removeItem(key)
      })
    }
  }

  return (
    <div style={{
      display: "flex", 
      position: "relative", 
      flexDirection: isMobile ? "column" : "row", 
      background: "#F2F2F2", 
      padding: isMobile ? "0px" : "80px", 
      gap: "8%"
    }}>
      <button
        style={{ 
          opacity: hoverGoBack ? "1" : "0.5", 
          background: "none",
          position: "absolute",
          border: "none", 
          cursor: "pointer",
          top: "30px",
          fontSize: "16px",
          marginLeft: isMobile ? "58px" : "",
          color: hoverGoBack ? "#d87d4a" : "inherit",
          transition: "color 0.2s",
          width: "200px",
          padding: "0px",
          textAlign: "left"
        }}
        onClick={() => navigate(-1)}
        onMouseEnter={() => setHoverGoBack(true)}
        onMouseLeave={() => setHoverGoBack(false)}
      >
        Go Back
      </button>
      <div style={{width: isMobile ? "" : "60%", padding: isMobile ? "80px 40px" : "60px 40px 40px", margin: isMobile ? "20px" : "", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", background: "#FFF", borderRadius: "12px"}}>
        <h2 style={{marginBottom: "40px"}}>CHECKOUT</h2>
        <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "40px", alignItems: "start"}}>
          <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "start", gap: "10px"}}>
            <HSixHeader text={"BILLING DETAILS"} />
            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: isMobile ? "17px" : "28px"}}>
              <div style={{display: "flex", alignItems: isMobile ? "start" : "center", justifyContent: isMobile ? "center" : "start", flexDirection: isMobile ? "column" : "row", width: "100%", gap: isMobile ? "17px" : "7%"}}>
                <Field textInput={"Name"} style={{width: isMobile ? "100%" : "40%" }} placeholderText={"Alexei Ward"} value={billingName} setValue={setBillingName}/>
                <Field textInput={"Email Address"} style={{width: isMobile ? "100%" :"40%" }} placeholderText={"alexie@mail.com"} value={emailAddress} setValue={setEmailAddress}/>
              </div>
              <div style={{width: isMobile ? "100%" : "40%"}}>
                <Field textInput={"Phone Number"} placeholderText={"+1 202-555-0136"} value={phoneNumber} setValue={setPhoneNumber}/>
              </div>
            </div>
          </div>
          <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "start", gap: "10px"}}>
            <HSixHeader text={"SHIPPING INFO"} />
            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: isMobile ? "17px" : "28px"}}>
              <div style={{display: "flex", alignItems: "start", justifyContent: "center", width: isMobile ? "100%" : "87%"}}>
                <LongField textInput={"Address"} placeholderText={"1137 Williams Avenue"} style={{width: "100%"}} value={shippingAddress} setValue={setShippingAddress}/>
              </div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "start", width: "100%", flexDirection:  isMobile ? "column" : "row", gap: isMobile ? "17px" : "7%"}}>
                <Field textInput={"ZIP Code"} style={{width: isMobile ? "100%" : "40%"}} placeholderText={"10001"} type={"number"} value={zipCode} setValue={setZipCode}/>
                <Field textInput={"City"}  style={{width: isMobile ? "100%" : "40%"}} placeholderText={"New York"} value={city} setValue={setCity}/>
              </div>
              <div style={{width: isMobile ? "100%" : "40%"}}>
                <Field textInput={"Country"} placeholderText={"United States"} value={country} setValue={setCountry}/>
              </div>
            </div>
          </div>
          <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "start", gap: "10px"}}>
            <HSixHeader text={"PAYMENT DETAILS"} />
            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "28px"}}>
              <div style={{display: "flex", width: "100%", gap: "7%"}}>
                <p style={{fontWeight: "bold", fontSize: "12px", margin: "0px", width: "40%", textAlign: "start"}}>Payment Method</p>
                <div style={{display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", width: "40%", gap: "16px"}}>
                  <PaymentOptionButton textInput={"e-Money"} isActiveButton={paymentOption === "e-Money"} setPaymentOption={setPaymentOption}/>
                  <PaymentOptionButton textInput={"Cash on Delivery"} isActiveButton={paymentOption === "Cash on Delivery"} setPaymentOption={setPaymentOption}/>
                </div>
              </div>
              {
                paymentOption === "e-Money" && (
                  <div style={{display: "flex", alignItems: "center", justifyContent: "start", width: "100%", gap: "7%"}}>
                    <Field textInput={"e-Money Number"} style={{width: "40%"}} placeholderText={"238521993"} type={"number"} value={eMoneyNumber} setValue={setEMoneyNumber}/>
                    <Field textInput={"e-Money PIN"} style={{width: "40%"}} placeholderText={"6891"} type={"number"} value={eMoneyPin} setValue={setEMoneyPin}/>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div style={{ width:  isMobile ? "" : "32%", background: "#FFF", height: "70%", borderRadius: "12px", padding: isMobile ? "0px 40px 40px" : "60px 40px 40px", margin: isMobile ? "20px" : "", display: "flex", flexDirection: "column", gap: "20px"}}>
        <h5 style={{textAlign: "start"}}>SUMMARY</h5>
        <div style={{display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center"}}>
          {cartList.map(itemInput => {
              const item = Object.values(itemInput)[0];
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "16px", gap: "2%", justifyContent: "start" }}>
                    <div style={{width: "20%", display: "flex", alignItems: "start"}}>
                        <img src={item.image.desktop.replace("./", "/")} alt={item.name} style={{ width: "60%", objectFit: "cover", borderRadius: 4, marginRight: "12px" }} />
                    </div>
                    <div style={{ width: "75%", display: "flex", alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                        <p style={{ fontWeight: "bold", margin: 0, textAlign: "start" }}>{item.name}</p>
                        <p style={{ margin: 0, textAlign: "start", opacity: "50%" }}>${commaSeparatedPrice(String(item.price))}</p>
                    </div>
                    <div style={{display: "flex", justifyContent: "start", opacity: "50%"}}>x{item.quantity}</div>
                </div>
              )
          })}
        </div>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start"}}>
          <SubTotalField data={`$ ${commaSeparatedPrice(String(total))}`} name={"TOTAL"}/>
          <SubTotalField data={`$ 50`} name={"SHIPPING"}/>
          <SubTotalField data={`$ ${commaSeparatedPrice(String(vatValue))}`} name={"VAT (INCLUDED)"}/>
        </div>
        <div>
          <SubTotalField data={`$ ${commaSeparatedPrice(String(total + 50 + vatValue))}`} name={"GRAND TOTAL"}/>          
        </div>
        <div>
          <button 
            style={{
              background: isFormValid ? "#d87d4a" : "#bcbcbc",
              border: "none",
              padding: "10px 0px",
              borderRadius: "5px",
              color: "#FFF",
              cursor: isFormValid ? "pointer" : "not-allowed",
              opacity: isFormValid ? 1 : 0.6,
              transition: "background 0.2s, opacity 0.2s",
              width: "100%"
            }}
            disabled={!isFormValid}
            onClick={(e) => handleCheckoutClick(e)}
          >
            CONTINUE & PAY
          </button>
          {
            !isFormValid && (
              <p style={{margin: "0px", fontSize: "8px", color: "#d87d4a", textAlign: "start"}}>
                A required field has not been filled.
              </p>
            )
          }
        </div>
      </div>
      <ThankYouModal open={thankYouModalOpen} onClose={() => setThankYouModalOpen(false)} cartList={cartList}/>
    </div>
  );
}