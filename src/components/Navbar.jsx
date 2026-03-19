import { useCart } from "../hooks/useCart";
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {

  const scrollToInventory = () => {
    const element = document.getElementById('inventario');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { toggleCart, cartItems } = useCart();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Lado Izquierdo: Logo y Links */}
        <div className="flex items-center gap-12">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-2xl text-[#0f1829]">science</span>
            <h1 className="text-[#0f1829] text-xl font-bold tracking-[0.2em] uppercase">
              ELMNT
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {['Tienda', 'Estudios Clínicos', 'El Laboratorio'].map((item) => (
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

        <div className="flex items-center gap-1 sm:gap-2">
          {/* BUSCADOR */}
          <div className="relative flex items-center justify-end">
            <input
              id="search-input"
              type="text"
              placeholder="Buscar"
              className="absolute right-0 bg-slate-100/90 border-none focus:outline-none text-[16px] md:text-[12px] rounded-lg transition-all duration-300 w-0 h-0 opacity-0 focus:w-[110px] sm:focus:w-[130px] md:focus:w-[180px] focus:h-9 focus:px-3 focus:opacity-100 z-10" //MODIFICADO
              onFocus={scrollToInventory}
              onChange={(e) => {
                onSearch(e.target.value);
                //scrollToInventory();
              }}
            />
            <span
              className="material-symbols-outlined cursor-pointer p-2 flex items-center justify-center z-20"
              style={{ fontSize: '22px' }}
              onClick={() => {
                document.getElementById('search-input').focus()
                scrollToInventory();
              }
              }
            >
              search
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* BOTÓN CARRITO CON CONTADOR */}
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-[#0f1829] relative group"
            >
              <span className="material-symbols-outlined cursor-pointer" style={{ fontSize: '22px' }}>shopping_bag</span>

              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#83A982] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-white/50 rounded-full transition-colors text-[#0f1829]">
              <span className="material-symbols-outlined" style={{ fontSize: '27px' }}>person</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;