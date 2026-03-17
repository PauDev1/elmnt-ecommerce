import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y Eslogan */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-2xl">science</span>
              <h2 className="text-xl font-bold tracking-[0.2em] uppercase">ELMNT</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ciencia aplicada al cuidado de tu piel. Fórmulas minimalistas, resultados máximos.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900">Productos</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-slate-800 cursor-pointer transition-colors">Sérums</li>
              <li className="hover:text-slate-800 cursor-pointer transition-colors">Hidratantes</li>
              <li className="hover:text-slate-800 cursor-pointer transition-colors">Limpiadores</li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900">Ayuda</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-slate-800 cursor-pointer transition-colors">Envíos</li>
              <li className="hover:text-slate-800 cursor-pointer transition-colors">Preguntas Frecuentes</li>
              <li className="hover:text-slate-800 cursor-pointer transition-colors">Contacto</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-900">Suscribite</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-50 pt-8 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            © 2026 ELMNT Lab. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

