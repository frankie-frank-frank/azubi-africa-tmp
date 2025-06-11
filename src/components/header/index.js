import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartModal from '../cart/CartModal';

export default function Header() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleIncrease = id => setCartItems(items =>
        items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
    const handleDecrease = id => setCartItems(items =>
        items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
    );

    return (
        <div className="App-header-wrapper">
            <header className="App-header">
                <div className="audiophile-icon-container">
                    <Link to="/"><img src="/assets/shared/desktop/logo.svg" alt="Audiophile Logo" className='audiophile-logo'/></Link>
                </div>
                <div className="header-icons">
                    <Link to="/"><button>HOME</button></Link>
                    <Link to="/headphones"><button>HEADPHONES</button></Link>
                    <Link to="/speakers"><button>SPEAKERS</button></Link>
                    <Link to="/earphones"><button>EARPHONES</button></Link>
                </div>
                <div>
                    <img 
                        src="/shopping-cart.svg" 
                        alt="Icons8 Logo" 
                        className='cart-icon'
                        style={{ cursor: "pointer" }}
                        onClick={() => setCartOpen(true)}
                    />
                </div>
            </header>
            <hr className="header-divider"/>
            <CartModal
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                cartItems={cartItems}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />
        </div>
    )
}