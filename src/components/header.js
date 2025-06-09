export default function Header() {
    return (
        <div className="App-header-wrapper">
            <header className="App-header">
                <div className="audiophile-icon-container">
                    <img src="/assets/shared/desktop/logo.svg" alt="Audiophile Logo" className='audiophile-logo'/>
                </div>
                <div className="header-icons">
                    <button>HOME</button>
                    <button>HEADPHONES</button>
                    <button>SPEAKERS</button>
                    <button>EARPHONES</button>
                </div>
                <div>
                    <img src="/icons8-shopping-cart-50.png" alt="Icons8 Logo" className='cart-icon'/>
                </div>
            </header>
            <hr className="header-divider"/>
        </div>
    )
}