import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import AdminPanel from './pages/AdminPanel';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from "./components/ScrollToTop";
import productosLocales from './products.json';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import { Toaster } from 'sonner';
import Laboratorio from './pages/Laboratorio';
import Estudios from './pages/Estudios';


const API_URL = "https://6928a0c7b35b4ffc50165dfb.mockapi.io/Products"

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error en la respuesta de la red");

        const data = await res.json();
        const cleanData = data.filter(item => {
          const hasName = (item.name || item.title) && !(item.name || item.title).toLowerCase().includes("title ");
          const hasCategory = item.category && item.category !== "";
          const hasPrice = item.price && !isNaN(item.price) && item.price > 0;
          const hasDescription = item.description && item.description.length > 5;
          const hasStock = item.stock !== undefined && !isNaN(item.stock);
          return hasName && hasCategory && hasPrice && hasDescription && hasStock;
        });

        setProducts(cleanData);
      } catch (err) {
        console.error("MockAPI falló, cargando backup local:", err);
        setProducts(productosLocales);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleAddProduct = async (newProd) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      });

      if (!res.ok) throw new Error("Error en la API");

      const data = await res.json();

      setProducts(prevProducts => [...prevProducts, data]);

    } catch (err) {
      console.error("No se pudo agregar a la API, agregando localmente:", err);

      const tempProduct = { ...newProd, id: Date.now().toString() };
      setProducts(prevProducts => [...prevProducts, tempProduct]);
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      setProducts(products.map(p => p.id === id ? updatedData : p));
    } catch (err) { console.error("No se pudo actualizar:", err); }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) { console.error("No se pudo eliminar:", err); }
  };

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Toaster
          position="bottom-right"
          visibleToasts={1}
          duration={1500}
          toastOptions={{
            unstyled: true,
            className: 'my-custom-toast',
          }}
        />
        <CartDrawer />
        <Navbar
          onSearch={setSearchTerm}
          isAdmin={isAdmin}
          onLogout={() => setIsAdmin(false)}
        />

        <Routes>
          <Route path="/" element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              products={products}
            />
          } />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/laboratorio" element={<Laboratorio />} />
          <Route path="/estudios" element={<Estudios />} />

          {/* RUTA DE LOGIN */}
          <Route path="/admin-login" element={
            isAdmin ? <Navigate to="/admin" /> : <Login onLogin={setIsAdmin} />
          } />

          {/* RUTA ADMIN */}
          <Route path="/admin" element={
            isAdmin ? (
              <AdminPanel
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onLogout={() => setIsAdmin(false)}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } />

          {/* RUTA DETALLE */}
          <Route path="/product/:id" element={<ProductDetail products={products} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;