

const Navbar = ({ onSearch }) => {

  // Función para scroll suave al inventario
  const scrollToInventory = () => {
    const element = document.getElementById('inventario');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Lado Izquierdo: Logo y Links */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="material-symbols-outlined text-2xl text-[#0f1829]">science</span>
            <h1 className="text-[#0f1829] text-xl font-bold tracking-[0.2em] uppercase">
              ELMNT
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Tienda', 'Estudios Clínicos', 'El Laboratorio'].map((item) => (
              //   <a key={item} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-colors">
              //     {item}
              //   </a>

              <button
                key={item}
                onClick={item === 'Tienda' ? scrollToInventory : undefined}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>


        <div className="flex items-center gap-6">
          <div className="relative hidden sm:flex items-center bg-slate-100/50 px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-lg text-slate-400 mr-2">search</span>
            {/* <input
              type="text"
              placeholder="Buscar formulaciones"
              className="bg-transparent border-none focus:outline-none text-[11px] w-48"
              onChange={(e) => onSearch(e.target.value)}
            /> */}

            <input
              type="text"
              placeholder="Buscar formulaciones"
              className="bg-transparent border-none focus:outline-none text-[11px] w-48"
              onFocus={scrollToInventory} // <--- Al hacer clic en el buscador, baja
              onChange={(e) => {
                onSearch(e.target.value);
                scrollToInventory();      // <--- Al escribir, se asegura de estar abajo
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/50 rounded-full transition-colors text-[#0f1829]">
              <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            </button>
            <button className="p-2 hover:bg-white/50 rounded-full transition-colors text-[#0f1829]">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;