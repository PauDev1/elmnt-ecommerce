import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from "./components/ScrollToTop";


const Home = lazy(() => import('./pages/Home'));
const Checkout = lazy(() => import('./pages/Checkout'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Login = lazy(() => import('./pages/Login'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Laboratorio = lazy(() => import('./pages/Laboratorio'));
const Estudios = lazy(() => import('./pages/Estudios'));


const API_URL = "https://6928a0c7b35b4ffc50165dfb.mockapi.io/Products"

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);

  //localstorage-admin, borralo
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    return savedAdmin === 'true';
  })


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
        console.error("Error al cargar productos de la API:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //localstorage-admin, borralo
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);


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
      console.error("Error al guardar en el servidor:", err);
      alert("No se pudo guardar el producto. Intentalo más tarde.");
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
        <div className={isAdmin ? "admin-toaster" : "shop-toaster"}>
          <Toaster
            position="bottom-right"
            visibleToasts={1}
            duration={1500}
            containerClassName={isAdmin ? "admin-toaster" : "shop-toaster"}
          />
        </div>
        <CartDrawer />
        <Navbar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          isAdmin={isAdmin}
          onLogout={() => {
            setIsAdmin(false);
            localStorage.removeItem('isAdmin'); // LocalStorage admin, borralo
          }} />
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center font-bold uppercase tracking-widest text-xs">
            Cargando...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} products={products} isAdmin={isAdmin} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/laboratorio" element={<Laboratorio isAdmin={isAdmin} />} />
            <Route path="/estudios" element={<Estudios isAdmin={isAdmin} />} />
            <Route path="/admin-login" element={isAdmin ? <Navigate to="/admin" /> : <Login onLogin={setIsAdmin} />} />
            <Route path="/admin" element={
              isAdmin ? (
                <AdminPanel products={products} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} onLogout={() => setIsAdmin(false)} />
              ) : (
                <Navigate to="/" replace />
              )
            } />
            <Route path="/product/:id" element={<ProductDetail products={products} isAdmin={isAdmin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;