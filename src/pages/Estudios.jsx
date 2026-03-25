import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { estudiosData } from '../data/estudios';
import { papersCientificos } from '../data/papers';

const Estudios = () => {
  const [openPaper, setOpenPaper] = useState(null);
  const navigate = useNavigate();

  const handleExplorarClick = () => {
    navigate('/', { state: { scrollTo: 'inventario' } });
    setTimeout(() => {
      const element = document.getElementById('inventario');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto pt-32 pb-24 px-6">

        {/* Header Principal */}
        <div className="mb-10 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-16">
          <div className="max-w-2xl">
            <h1 className="text-[10px] font-bold tracking-ultra uppercase text-nature">Elmnt Lab Estudios Clínicos</h1>
            <h2 className="text-4xl md:text-5xl font-black text-brand tracking-tighter leading-tight">
              Ingeniería Molecular <br /> Aplicada a la Piel.
            </h2>
          </div>
          <p className="text-slate-500 text-base max-w-xs leading-relaxed italic border-l-2 border-nature pl-4 mt-4 md:mt-0 text-pretty">
            "Ciencia aplicada al cuidado de tu piel. Fórmulas minimalistas, resultados máximos."
          </p>
        </div>

        {/* Grilla de Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {estudiosData.map((estudio) => (
            <article key={estudio.id} className="group border-l border-slate-100 pl-8 py-2 hover:border-nature transition-colors duration-500">
              <div className="mb-6">
                <span className="inline-block text-5xl font-light text-nature/70 group-hover:text-nature group-hover:scale-110 transform transition-all duration-500 ease-out origin-left">
                  {estudio.porcentaje}
                </span>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{estudio.titulo}</h3>
              <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-tighter">{estudio.producto}</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">{estudio.descripcion}</p>
              <footer className="bg-slate-50 p-4 rounded-sm">
                <p className="text-[9px] uppercase tracking-[0.1em] text-slate-400 leading-relaxed italic">
                  Metodología: {estudio.metodologia}
                </p>
              </footer>
            </article>
          ))}
        </div>

        {/* Sección de Filosofía y Publicaciones */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-start bg-slate-50/50 p-8 md:p-16 rounded-3xl">
          <div >
            <h3 className="text-[10px] font-bold uppercase tracking-ultra text-nature mb-2">Filosofía de Formulación</h3>
            <h4 className="text-3xl font-black text-brand tracking-tighter mb-6 leading-tight">
              Menos ingredientes, <br /> mayor potencia.
            </h4>
            <p className="text-slate-500 leading-relaxed text-base text-pretty">
              En ELMNT eliminamos los agentes de relleno, fragancias sintéticas y colorantes. Cada molécula en nuestras fórmulas tiene una función biológica específica. Creemos en la transparencia total y en la eficacia respaldada por datos, no por promesas.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-2">Publicaciones Científicas</p>
            {papersCientificos.map((paper, index) => (
              <div key={index} className="bg-white border border-slate-100 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <button
                  onClick={() => setOpenPaper(openPaper === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div>
                    <span className="text-[8px] font-mono text-nature block mb-1">{paper.id}</span>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-tight">{paper.titulo}</h5>
                  </div>
                  <span className={`material-symbols-outlined transition-transform duration-300 text-slate-400 ${openPaper === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${openPaper === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="p-5 pt-0 border-t border-slate-50">
                    <p className="text-[12px] text-slate-600 leading-relaxed mb-4">{paper.resumen}</p>
                    <div className="bg-slate-50 p-3 rounded text-[11px] text-slate-400 text-pretty border-l-2 border-nature">{paper.detalles}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Ética */}
        <section className="mt-20 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-nature/5 text-nature mb-6">
              <span className="material-symbols-outlined text-2xl">Pets</span>
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-nature mb-2">Ética en la Innovación</h3>
            <h4 className="text-3xl md:text-4xl font-black text-brand tracking-tighter mb-8">
              Cruelty-Free por convicción, <br /> científicos por naturaleza.
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-10">
              <div className="border-l-2 border-nature/20 pl-6">
                <h5 className="text-[10px] font-black uppercase mb-3 text-slate-800 tracking-wider">Testeo Alternativo</h5>
                <p className="text-sm text-slate-500 leading-relaxed text-pretty">
                  Sustituimos los métodos arcaicos por tecnología de punta. Validamos la seguridad de nuestras fórmulas mediante <strong>modelos de epidermis humana reconstituida</strong> (RHE) y bio-ensayos in-vitro que ofrecen resultados más precisos y éticos.
                </p>
              </div>
              <div className="border-l-2 border-nature/20 pl-6">
                <h5 className="text-[10px] font-black uppercase mb-3 text-slate-800 tracking-wider">Transparencia Radical</h5>
                <p className="text-sm text-slate-500 leading-relaxed text-pretty">
                  Cada activo en ELMNT es rastreado desde su origen. No solo garantizamos que el producto final <strong>no sea testeado en animales</strong>, sino que auditamos a cada proveedor para asegurar una cadena de suministro 100% ética.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner de Conversión */}
        <div className="mt-16 text-center">
          <button
            onClick={handleExplorarClick}
            className="inline-flex items-center gap-2 bg-brand text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-nature/20"
          >
            Explorar la Colección
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Estudios;