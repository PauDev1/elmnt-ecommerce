import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  const productsPerPage = 4;

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category.includes(activeCategory);
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  //paginacion:
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, activeCategory]);


  return (
    <div className="min-h-screen bg-[#f6f7f8] text-[#0f1829] font-sans">
      <Navbar onSearch={setSearchTerm} />

      <main>
        {/* HERO */}
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
              <button onClick={() => document.getElementById('inventario').scrollIntoView({ behavior: 'smooth' })} className="bg-[#0f1829] text-white px-8 py-4 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-black transition-all">
                Descubrir la Colección
              </button>
              <button className="border border-slate-200 px-8 py-4 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-white transition-all flex items-center gap-2">

                <span className="material-symbols-outlined text-lg">play_circle</span> Método de Laboratorio
              </button>
            </div>
          </div>
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 shadow-2xl">
            <img
              src="https://res.cloudinary.com/dqdeoxwcw/image/upload/f_auto,q_auto,w_800/v1773439475/hero_dp57cc.webp"
              className="w-full h-full object-cover"
              alt="Hero ELMNT"
            />
          </div>
        </section>

        {/* SECCION COLECCION  */}
        <section id="inventario" className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* TÍTULO Y RESULTADOS */}
            <div className="flex items-baseline justify-between mb-8 border-b border-slate-100 pb-6">
              <h3 className="text-2xl font-bold tracking-tighter uppercase italic text-[#0f1829]">Colección</h3>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                {loading ? "Cargando formulaciones..." : `Mostrando ${filteredProducts.length} resultados`}
              </span>
            </div>

            {/* BARRA DE FILTROS Y ORDEN */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-[#fcfcfc] p-4 rounded-lg border border-slate-50">
              {/* Filtros de Categoría */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Ver Todo', value: 'all' },
                  { label: 'Limpieza', value: 'Cleansers' },
                  { label: 'Hidratación', value: 'Hydration' },
                  { label: 'Serums', value: 'Treatment' },
                  { label: 'Protectores', value: 'Protection' } 
                ].map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all border
                    ${activeCategory === cat.value
                        ? 'bg-[#0f1829] text-white border-[#0f1829]'
                        : 'bg-transparent text-slate-400 border-slate-200 hover:border-slate-400'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Selector de Orden */}
              <div className="flex items-center gap-3 border-l pl-6 border-slate-100">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 italic">Ordenar:</span>
                <select
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[10px] font-bold uppercase tracking-widest bg-transparent cursor-pointer outline-none text-[#0f1829]"
                >
                  <option value="default">Relevancia</option>
                  <option value="low">Precio: Menor a Mayor</option>
                  <option value="high">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <p className="col-span-full text-center py-20 text-slate-400 uppercase tracking-widest text-xs">
                  Sincronizando formulaciones...
                </p>
              ) : currentProducts.length > 0 ? (
                currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center py-20 text-slate-400 text-xs uppercase tracking-widest">
                  No se encontraron formulaciones que coincidan con "{searchTerm}"
                </p>
              )}
            </div>

            {/* PAGINACIÓN  */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(prev => prev - 1);
                    document.getElementById('inventario').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-2 disabled:opacity-20 transition-all"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back_ios</span>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Anterior</span>
                </button>

                <div className="h-[1px] w-12 bg-slate-200"></div>

                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
                  {currentPage} / {totalPages}
                </span>

                <div className="h-[1px] w-12 bg-slate-200"></div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(prev => prev + 1);
                    document.getElementById('inventario').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-2 disabled:opacity-20 transition-all"
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Siguiente</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                </button>
              </div>
            )}


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
    </div >
  );
}

export default App;