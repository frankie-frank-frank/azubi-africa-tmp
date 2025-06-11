import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
import HomePage from './components/homepage';
import ProductCategoryPage from './components/productcategory';
import CheckoutPage from './components/checkout/CheckoutPage';
import ProductDetailPage from './components/productdetail';
import BackToTopButton from "./components/ui/BackToTopButton";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{ flex: 1}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/headphones" element={<ProductCategoryPage type="headphones" />} />
            <Route path="/speakers" element={<ProductCategoryPage type="speakers" />} />
            <Route path="/earphones" element={<ProductCategoryPage type="earphones" />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
        <Footer />
        <BackToTopButton />
      </div>
    </Router>
  );
}

export default App;
