// import { useState, useEffect } from 'react'; // Agregamos estos dos
// import Navbar from './Navbar';
// import ProductCard from './ProductCard';

// function App() {
//   // 1. Creamos el estado para los productos
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 2. Función para buscar los datos
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("https://6928a0c7b35b4ffc50165dfb.mockapi.io/Products"); // <--- PEGA TU LINK ACÁ
//       const data = await response.json();
//       setProducts(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error cargando productos:", error);
//       setLoading(false);
//     }
//   };

//   // 3. Ejecutamos la búsqueda al montar el componente
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f6f7f8] text-[#0f1829] font-sans">
//       <Navbar />

//       <main>
//         {/* Hero Section */}
//         <section className="max-w-7xl mx-auto py-16 px-6 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col gap-4">
//               <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500">Stability Tested • Bio-available</span>
//               <h2 className="text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[#0f1829]">
//                 Molecular <br /> <span className="font-bold">Precision.</span>
//               </h2>
//               <p className="text-lg text-slate-600 max-w-md leading-relaxed font-light">
//                 Clinically engineered formulations featuring high-purity active ingredients for cellular-level skin transformation.
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="bg-[#0f1829] text-white px-8 py-4 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-black transition-all">
//                 Discover the Collection
//               </button>
//               <button className="border border-slate-200 px-8 py-4 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-white transition-all flex items-center gap-2">
//                 <PlayCircle size={18} /> Laboratory Method
//               </button>
//             </div>
//           </div>
//           <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 shadow-2xl">
//             <img 
//               src="https://res.cloudinary.com/dqdeoxwcw/image/upload/v1773439475/hero_dp57cc.webp" 
//               className="w-full h-full object-cover grayscale-[20%]" 
//               alt="Hero ELMNT" 
//             />
//           </div>
//         </section>

        

//         {/* Inventory Section */}
//         <section className="bg-white py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-baseline justify-between mb-12 border-b border-slate-100 pb-6">
//               <h3 className="text-2xl font-bold tracking-tighter uppercase italic text-[#0f1829]">Current Inventory</h3>
//               <span className="text-[10px] text-slate-400 uppercase tracking-widest">
//                 {loading ? "Loading formulations..." : `Showing ${products.length} Featured Formulations`}
//               </span>
//             </div>
            
//             {/* Grilla de productos dinámica */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {loading ? (
//                 // Un mensaje simple de carga o esqueletos
//                 <p className="col-span-full text-center py-20 text-slate-400 uppercase tracking-widest text-xs">
//                   Connecting to Laboratory Server...
//                 </p>
//               ) : (
//                 products.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))
//               )}
//             </div>
//           </div>
//         </section>

//         {/* The ELMNT Standard - Las 3 cajitas blancas del final */}
//         <section className="py-24 px-6 bg-[#f6f7f8]">
//           <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
//             <div className="lg:col-span-1">
//               <h3 className="text-3xl font-bold text-[#0f1829] mb-6 tracking-tight">The ELMNT Standard</h3>
//               <p className="text-slate-600 text-sm leading-relaxed mb-8 font-light italic">
//                 Every formulation is developed in-house at our ISO-certified laboratory, ensuring that every molecule serves a precise biological function without filler or fragrance.
//               </p>
//               <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#0f1829] pb-1 inline-block">Learn our Process</a>
//             </div>
//             <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
//               {[
//                 { icon: <Microscope />, title: "Molecular Bio-Availability", desc: "Particles engineered to penetrate the lipid barrier effectively." },
//                 { icon: <Thermometer />, title: "Cold-Process Technology", desc: "Preserving active integrity by avoiding thermal degradation." },
//                 { icon: <ShieldCheck />, title: "Purity Verification", desc: "Third-party chromatography testing on every batch." }
//               ].map((box, i) => (
//                 <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
//                   <div className="text-[#0f1829] mb-4">{box.icon}</div>
//                   <h5 className="font-bold text-[10px] uppercase tracking-wider mb-2">{box.title}</h5>
//                   <p className="text-[11px] text-slate-500 leading-relaxed font-light">{box.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://6928a0c7b35b4ffc50165dfb.mockapi.io/Products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-[#0f1829] font-sans">
   
      <Navbar onSearch={setSearchTerm} />

      <main>

        <section className="max-w-7xl mx-auto py-16 px-6 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500">Estabilidad testeada • Bio-disponible</span>
              <h2 className="text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[#0f1829]">
                 Precisión <span className="font-bold">Molecular.</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-md leading-relaxed font-light">
                Formulaciones clínicamente diseñadas con ingredientes activos de alta pureza para una transformación de la piel a nivel celular.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-[#0f1829] text-white px-8 py-4 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-black transition-all">
                Descubrir la Colección
              </button>
              <button className="border border-slate-200 px-8 py-4 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-white transition-all flex items-center gap-2">
            
                <span className="material-symbols-outlined text-lg">play_circle</span> Método de Laboratorio
              </button>
            </div>
          </div>
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 shadow-2xl">
            <img 
              src="https://res.cloudinary.com/dqdeoxwcw/image/upload/v1773439475/hero_dp57cc.webp" 
              className="w-full h-full object-cover" 
              alt="Hero ELMNT" 
            />
          </div>
        </section>

      
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline justify-between mb-12 border-b border-slate-100 pb-6">
              <h3 className="text-2xl font-bold tracking-tighter uppercase italic text-[#0f1829]">Inventario Actual</h3>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                {loading ? "Cargando formulaciones..." : `Mostrando ${filteredProducts.length} resultados`}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <p className="col-span-full text-center py-20 text-slate-400 uppercase tracking-widest text-xs">
                  Sincronizando formulaciones...
                </p>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </section>

      
        <section className="py-24 px-6 bg-[#f6f7f8]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-bold text-[#0f1829] mb-6 tracking-tight">El Estándar ELMNT</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 font-light italic">
                Cada formulación se desarrolla internamente en nuestro laboratorio certificado ISO, asegurando que cada molécula cumpla una función biológica precisa sin relleno ni fragancia.
              </p>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#0f1829] pb-1 inline-block">Conocé nuestro proceso</a>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
              {[
                { icon: "biotech", title: "Bio-disponibilidad Molecular", desc: "Partículas diseñadas para penetrar efectivamente la barrera lipídica." },
                { icon: "thermostat", title: "Tecnología de Proceso Frío", desc: "Preservando la integridad activa al evitar la degradación térmica." },
                { icon: "verified_user", title: "Verificación de Pureza", desc: "Pruebas de cromatografía de terceros en cada lote." }
              ].map((box, i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
                  <div className="text-[#0f1829] mb-4">
                    <span className="material-symbols-outlined text-2xl">{box.icon}</span>
                  </div>
                  <h5 className="font-bold text-[10px] uppercase tracking-wider mb-2">{box.title}</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;