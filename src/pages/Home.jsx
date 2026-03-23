import { useEffect, useState } from 'react';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SkeletonCard from '../components/SkeletonCard.jsx';
import Features from '../sections/Features';
import Hero from '../sections/Hero';
import { useLocation } from 'react-router-dom';



function Home({ searchTerm, products = [], loading }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  const productsPerPage = 8;

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category.includes(activeCategory);
      const matchesSearch = (product.name || "").toLowerCase().includes((searchTerm || "").toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const location = useLocation();


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);


  useEffect(() => {
    if (location.state?.scrollTo === 'inventario') {
      const timer = setTimeout(() => {
        const element = document.getElementById('inventario');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }

        window.history.replaceState({}, document.title);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const isLoading = products.length === 0 && searchTerm === "";


  return (
    <div className="min-h-screen bg-[#f6f7f8] text-[#0f1829] font-sans">
      <main className="pt-[80px] md:pt-[80px]">
        <Hero />
        {/* SECCION COLECCION  */}
        <section id="inventario" className="bg-white pt-12 md:pt-20 pb-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">

            <div className="flex items-baseline justify-between mb-4 md:mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tighter uppercase italic text-[#0f1829]">Colección</h2>
              <span className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest">
                {loading ? "Cargando..." : `${filteredProducts.length} resultados`}
              </span>
            </div>

            {/* BARRA DE FILTROS Y ORDEN */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mb-8 bg-[#fcfcfc] md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">

              {/* Filtros de Categoría*/}
              <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
                <div className="flex flex-nowrap md:flex-wrap gap-2 pb-1 md:pb-0">
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
                      className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer  transition-all border shrink-0 ${activeCategory === cat.value
                        ? 'bg-[#0f1829] text-white border-[#0f1829]'
                        : 'bg-white md:bg-transparent text-slate-400 border-slate-200'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto md:border-l md:pl-6 border-slate-100">
                <label
                  htmlFor="sort-select"
                  className="text-[9px] font-bold uppercase tracking-widest text-slate-400 italic cursor-pointer"
                >
                  Ordenar:
                </label>

                <select
                  id="sort-select" 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[10px] font-bold uppercase tracking-widest bg-transparent cursor-pointer outline-none text-[#0f1829]"
                >
                  <option value="default">Relevancia</option>
                  <option value="low">Menor Precio</option>
                  <option value="high">Mayor Precio</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 min-h-[600px] content-start">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
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
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform cursor-pointer">arrow_back_ios</span>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer">Anterior</span>
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
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer">Siguiente</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform cursor-pointer">arrow_forward_ios</span>
                </button>
              </div>
            )}
          </div>
        </section>
        <Features />
      </main>
      <Footer />
    </div >
  );
}

export default Home;