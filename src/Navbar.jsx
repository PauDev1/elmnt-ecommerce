

// const Navbar = () => {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-12">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <Beaker className="text-[#0f1829] w-6 h-6" />
//             <h1 className="text-[#0f1829] text-xl font-bold tracking-[0.2em] uppercase italic">ELMNT</h1>
//           </div>
          
//           {/* Nav Links */}
//           <nav className="hidden md:flex items-center gap-8">
//             {['Shop All', 'Clinical Studies', 'The Lab'].map((item) => (
//               <a key={item} href="#" className="text-sm font-medium text-slate-600 hover:text-black transition-colors uppercase tracking-widest">
//                 {item}
//               </a>
//             ))}
//           </nav>
//         </div>

//         <div className="flex items-center gap-6">
//           {/* Search Bar */}
//           <div className="relative hidden sm:block">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
//             <input 
//               type="text" 
//               placeholder="Search Formulations" 
//               className="bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-xs w-64 focus:ring-1 focus:ring-slate-200 outline-none"
//             />
//           </div>
          
//           {/* Icons */}
//           <div className="flex items-center gap-2">
//             <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700">
//               <ShoppingCart size={20} strokeWidth={1.5} />
//             </button>
//             <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700">
//               <User size={20} strokeWidth={1.5} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

const Navbar = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Lado Izquierdo: Logo y Links */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#0f1829]">science</span>
            <h1 className="text-[#0f1829] text-xl font-bold tracking-[0.2em] uppercase">
              ELMNT
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {['Shop All', 'Clinical Studies', 'The Lab'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-colors">
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Lado Derecho: Buscador e Iconos */}
        <div className="flex items-center gap-6">
          <div className="relative hidden sm:flex items-center bg-slate-100/50 px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-lg text-slate-400 mr-2">search</span>
            <input 
              type="text" 
              placeholder="Search Formulations" 
              className="bg-transparent border-none focus:outline-none text-[11px] w-48"
              onChange={(e) => onSearch(e.target.value)}
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