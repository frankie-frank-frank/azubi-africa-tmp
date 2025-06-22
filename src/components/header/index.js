import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartModal from '../cart/CartModal';
import dataList from "../../data.json"
import { useWindowWidth } from "../../custom-hooks"

export default function Header() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        const slugList = dataList.map(item => ({slug: item.slug, id: item.id}));
        if (!slugList) return [];
        const cartList = []
        for(const slugItem of slugList) {
            const key = `product-detail-${slugItem.slug}`;
            const stored = localStorage.getItem(key);
            if (stored) {
                cartList.push({ [key] : JSON.parse(stored)})
            }
        }
        return cartList;
    })
    const [totalCartQuantity, setTotalCartQuantity] = useState(cartItems.reduce((sum, itemInput) => {
        const item = Object.values(itemInput)[0];
        return sum + (item.quantity || 0);
    }, 0))
    
    function refreshCartItems() {
        const slugList = dataList.map(item => ({slug: item.slug, id: item.id}));
        const cartList = [];
        for(const slugItem of slugList) {
            const key = `product-detail-${slugItem.slug}`;
            const stored = localStorage.getItem(key);
            if (stored) {
            cartList.push({ [key] : JSON.parse(stored)});
            }
        }
        setCartItems(cartList);
        setTotalCartQuantity(cartList.reduce((sum, itemInput) => {
            const item = Object.values(itemInput)[0];
            return sum + (item.quantity || 0);
        }, 0))
    }

    const width = useWindowWidth();
    const isMobile = width < 768;

    const appHeaderClass = isMobile ? 'App-header-mobile' : 'App-header';
    const audioPhileIconClass = isMobile ? "" : "audiophile-icon-container";
    const appHeaderWrapperClass = isMobile ? "App-header-wrapper-mobile" : "App-header-wrapper";

    useEffect(() => {
        window.addEventListener("cart-updated", refreshCartItems);
        return () => window.removeEventListener("cart-updated", refreshCartItems);
    }, []);

    return (
        <div className={appHeaderWrapperClass}>
            <header className={appHeaderClass}>
                {
                    isMobile && (
                        <img src="/assets/MobileMenu.svg" alt="Menu Icon"/>
                    )
                }
                <div className={audioPhileIconClass}>
                    <Link to="/"><img src="/assets/shared/desktop/logo.svg" alt="Audiophile Logo" className='audiophile-logo'/></Link>
                </div>
                {
                    !isMobile && (
                        <div className="header-icons">
                            <Link to="/"><button>HOME</button></Link>
                            <Link to="/headphones"><button>HEADPHONES</button></Link>
                            <Link to="/speakers"><button>SPEAKERS</button></Link>
                            <Link to="/earphones"><button>EARPHONES</button></Link>
                        </div>
                    )
                }
                <div style={{position: "relative", display: "inline-block"}}>
                    <img 
                        src="/shopping-cart.svg" 
                        alt="Cart Icon" 
                        className='cart-icon'
                        style={{ cursor: "pointer" }}
                        onClick={() => setCartOpen(true)}
                    />
                    {totalCartQuantity > 0 && (
                        <span className="cart-badge">{totalCartQuantity}</span>
                    )}
                </div>
            </header>
            { !isMobile && <hr className="header-divider"/>}
            <CartModal
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setTotalCartQuantity={setTotalCartQuantity}
            />
        </div>
    )
}