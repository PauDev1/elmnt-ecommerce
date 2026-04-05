import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster, toast } from 'sonner';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from "./components/ScrollToTop";
import { apiFetch } from './utils/api';
import CustomToast from './components/CustomToast';


const Home = lazy(() => import('./pages/Home'));
const Checkout = lazy(() => import('./pages/Checkout'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Login = lazy(() => import('./pages/Login'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Laboratorio = lazy(() => import('./pages/Laboratorio'));
const Estudios = lazy(() => import('./pages/Estudios'));

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/products');

        const mappedData = data.map(item => ({
          ...item,
          id: item._id
        }));

        setProducts(mappedData);
      } catch (err) {
        console.error("Error al cargar productos del Backend:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (newProd) => {
    try {
      const data = await apiFetch('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newProd)
      });

      if (data) {
        setProducts(prev => [...prev, { ...data, id: data._id }]);
        toast.custom((t) => (
      <CustomToast 
        message="Producto registrado con éxito" 
        type="success" 
        label="REGISTRO" 
      />
    ));
      }
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const data = await apiFetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });

      setProducts(prev => prev.map(p => (p._id === id ? { ...data, id: data._id } : p)));
      toast.custom((t) => (
      <CustomToast 
        message="Cambios guardados con éxito" 
        type="success" 
        label="ACTUALIZACIÓN" 
      />
    ));
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => (p._id !== id && p.id !== id)));
      toast.custom((t) => (
      <CustomToast 
        message="Producto eliminado con éxito" 
        type="error" 
        label="ELIMINACIÓN" 
      />
    ));
    } catch (err) {
      console.error("No se pudo eliminar:", err);
    }
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
            localStorage.removeItem('token');
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
                <AdminPanel
                  products={products}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onLogout={() => {
                    setIsAdmin(false);
                    localStorage.removeItem('token');
                  }}
                />
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