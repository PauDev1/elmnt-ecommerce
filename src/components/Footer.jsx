import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, WebSite } from './icons';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-surface pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Logo y Eslogan */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 mb-6 cursor-pointer group w-fit"
            >
              <span className="material-symbols-outlined text-2xl text-brand group-hover:opacity-70 transition-opacity duration-300">
                science
              </span>
              <h2 className="text-xl font-bold tracking-ultra uppercase text-brand group-hover:opacity-70 transition-opacity duration-300">
                ELMNT
              </h2>
            </Link>
            <p className="text-body text-sm leading-relaxed">
              Ciencia aplicada al cuidado de tu piel. Fórmulas minimalistas, resultados máximos.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="col-span-1">
            <h3 className="font-bold mb-4 text-brand text-xs uppercase tracking-widest">Productos</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="hover:text-brand cursor-pointer transition-colors">Sérums</li>
              <li className="hover:text-brand cursor-pointer transition-colors">Hidratantes</li>
              <li className="hover:text-brand cursor-pointer transition-colors">Limpiadores</li>
            </ul>
          </div>

          {/* Ayuda */}
          <div className="col-span-1">
            <h3 className="font-bold mb-4 text-brand text-xs uppercase tracking-widest">Ayuda</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="hover:text-brand cursor-pointer transition-colors">Envíos</li>
              <li className="hover:text-brand cursor-pointer transition-colors">Preguntas Frecuentes</li>
              <li className="hover:text-brand cursor-pointer transition-colors">Contacto</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4 text-brand text-xs uppercase tracking-widest">Suscribite</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-surface border border-surface rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-brand transition-colors text-body"
              />
              <button className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand transition-colors">
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mi "firma"  */}
        <div className="border-t border-surface pt-10 pb-4 flex justify-center items-center">
          <div className="flex items-center gap-5">
            <span className="text-[11px] text-brand uppercase tracking-ultra font-bold whitespace-nowrap">
              Desarrollado por Pao
            </span>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/PauDev1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:scale-110 transition-all duration-300 flex items-center"
                title="Ver código en GitHub"
              >
                <GitHub className="w-7 h-7" />
              </a>

              <a
                href="https://pao-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:scale-110 transition-all duration-300 flex items-center"
                title="Visitar mi Portfolio"
              >
                <WebSite className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

