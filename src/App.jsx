import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar'; 
import { CartProvider } from './context/CartContext'; 
import ScrollToTop from "./components/ScrollToTop";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar onSearch={setSearchTerm}/> 
        
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;