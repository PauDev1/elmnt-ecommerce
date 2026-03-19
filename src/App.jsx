import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import AdminPanel from './components/admin/AdminPanel';
import { CartProvider } from './context/CartContext';
import ScrollToTop from "./components/ScrollToTop";
import productosLocales from './products.json';

const API_URL = "https://6928a0c7b35b4ffc50165dfb.mockapi.io/Products"

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. TRAER DATOS DE MOCKAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error en la respuesta de la red");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("MockAPI falló, cargando backup local:", err);
        setProducts(productosLocales);
      } finally {
        // ESTA LÍNEA ES CLAVE: pase lo que pase, dejamos de cargar
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- FUNCIONES DEL ADMIN (Conectadas a la API) ---

  // const handleAddProduct = async (newProd) => {
  //   try {
  //     const res = await fetch(API_URL, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(newProd)
  //     });
  //     const data = await res.json();
  //     setProducts([...products, data]); // Actualizamos el estado con lo que devolvió la API
  //   } catch (err) { console.error("No se pudo agregar:", err); }
  // };
  const handleAddProduct = async (newProd) => {
    try {
      // 1. Enviamos a la API
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      });

      if (!res.ok) throw new Error("Error en la API");

      const data = await res.json();

      // 2. Actualizamos el estado local con lo que nos devuelve la API (que ya trae su ID)
      setProducts(prevProducts => [...prevProducts, data]);

    } catch (err) {
      console.error("No se pudo agregar a la API, agregando localmente:", err);

      // Plan B: Si la API falla, lo agregamos al estado local con un ID temporal
      const tempProduct = { ...newProd, id: Date.now().toString() };
      setProducts(prevProducts => [...prevProducts, tempProduct]);
    }
  };

  // const handleUpdateProduct = async (id, field, value) => {
  //   try {
  //     await fetch(`${API_URL}/${id}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ [field]: value })
  //     });
  //     setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  //   } catch (err) { console.error("No se pudo actualizar:", err); }
  // };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData) // Enviamos todo el objeto corregido
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
      {/* <Router>
        <ScrollToTop />
        <Navbar onSearch={setSearchTerm}/> 
        
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router> */}

      <Router>
        <ScrollToTop />
        <Navbar onSearch={setSearchTerm} />

        <Routes>
          <Route path="/" element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              products={products}
            />
          } />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={
            <AdminPanel
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;