import { useState, useEffect, useRef } from 'react';
import { useCart } from "../hooks/useCart";
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = ({ onSearch, isAdmin, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { toggleCart, cartItems } = useCart();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname === '/admin';
  const isLoginPage = location.pathname === '/admin-login';


  const handleLogoClick = () => {
    if (isHomePage) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTiendaClick = () => {
    if (isHomePage) {
      const element = document.getElementById('inventario');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'inventario' } });
    }
  };

  return (
    <header className={`fixed top-0 z-50 w-full border-b border-slate-200 backdrop-blur-md ${isLoginPage ? 'bg-white' : 'bg-white/70'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Lado Izquierdo: Logo y Links */}
        <div className="flex items-center gap-12">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-2xl text-[#0f1829]">science</span>
            <h1 className="text-[#0f1829] text-xl font-bold tracking-[0.2em] uppercase">
              ELMNT
            </h1>
          </Link>

          {!isAdmin && !isLoginPage && (
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={handleTiendaClick}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-colors cursor-pointer"
              >
                Tienda
              </button>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-colors cursor-default">
                Estudios Clínicos
              </button>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-colors cursor-default">
                El Laboratorio
              </button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          
          {!isAdmin && !isLoginPage && (
            <div className="relative flex items-center justify-end">
              <input
                id="search-input"
                type="text"
                placeholder="Buscar"
                className="absolute right-0 bg-slate-100/90 border-none focus:outline-none text-[16px] md:text-[12px] rounded-lg transition-all duration-300 w-0 h-0 opacity-0 focus:w-[110px] sm:focus:w-[130px] md:focus:w-[180px] focus:h-9 focus:px-3 focus:opacity-100 z-10"
                onChange={(e) => {
                  onSearch(e.target.value);
                  if (!isHomePage) {
                    navigate('/' , { state: { scrollTo: 'inventario' } });
                  }
                }}
              />
              <span
                className="material-symbols-outlined cursor-pointer p-2 flex items-center justify-center z-20"
                style={{ fontSize: '22px' }}
                onClick={() => document.getElementById('search-input').focus()}
              >
                search
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
           
            {!isAdmin && !isLoginPage && (
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
            )}

            {/* Menú de Usuario / Admin */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => isAdmin ? setShowMenu(!showMenu) : navigate('/admin-login')}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-[#0f1829]"
              >
                <span className="material-symbols-outlined cursor-pointer" style={{ fontSize: '27px' }}>person</span>
              </button>

              {isAdmin && showMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="px-4 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Administrador</p>

                  <Link
                    to={isAdminPage ? "/" : "/admin"}
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg cursor-pointer">
                      {isAdminPage ? 'home' : 'inventory'}
                    </span>
                    {isAdminPage ? 'Ver Tienda' : 'Administración'}
                  </Link>

                  <div className="h-[1px] bg-slate-100 my-1" />

                  <button
                    onClick={() => { onLogout(); setShowMenu(false); navigate('/'); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg cursor-pointer">logout</span> Salir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;