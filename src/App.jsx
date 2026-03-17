import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar'; // Si el Navbar debe estar en todas las páginas
import { CartProvider } from './context/CartContext'; 

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <CartProvider>
      <Router>
        {/* El Navbar queda fijo arriba en todas las rutas */}
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