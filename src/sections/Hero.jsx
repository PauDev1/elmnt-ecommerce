import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold tracking-ultra uppercase text-body">Estabilidad testeada • Bio-disponible</span>
          <h1 className="text-6xl lg:text-7xl font-light leading-[1.1]  text-brand">
            Precisión <span className="font-bold">Molecular.</span>
          </h1>
          <p className="text-lg text-body max-w-md leading-relaxed font-light">
            Formulaciones clínicamente diseñadas con ingredientes activos de alta pureza para una transformación de la piel a nivel celular.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => document.getElementById('inventario').scrollIntoView({ behavior: 'smooth' })}
            className="h-[54px] bg-brand text-white px-8 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-brand transition-all cursor-pointer flex items-center justify-center"
          >
            Descubrir la Colección
          </button>

          <Link
            to="/laboratorio"
            className="h-[54px] border border-slate-200 px-8 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
          >
            <span className="material-symbols-outlined text-lg text-brand group-hover:rotate-12 transition-transform">
              biotech
            </span>
            Método de Laboratorio
          </Link>
        </div>
      </div>
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 shadow-2xl">
        <img
          src="/assets/hero.webp"
          className="w-full h-full object-cover"
          alt="Grupo de productos de ELMNT Molecular Precision Skincare" 
          loading="eager" 
          fetchPriority="high" 
        />
      </div>
    </section>
  );
};

export default Hero;