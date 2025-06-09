import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header'
import HomePage from './components/homepage';
import ProductPage from './components/productpage';
import CheckoutPage from './components/checkoutpage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/headphones" element={<ProductPage type="headphones" />} />
          <Route path="/speakers" element={<ProductPage type="speakers" />} />
          <Route path="/earphones" element={<ProductPage type="earphones" />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
