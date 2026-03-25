import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const Laboratorio = () => {
    const [currentImg, setCurrentImg] = useState(0);

    const images = [
        "/assets/lab/lab-serum.webp",
        "/assets/lab/lab-serum-1.webp",
        "/assets/lab/lab-cream.webp"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
        <main className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* CABECERA: Presentación de Marca */}
                <div className="mb-10 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-16">
                    <div className="max-w-2xl">
                        <h1 className="text-[10px] font-bold tracking-ultra uppercase text-nature">Elmnt Lab Protocol</h1>
                        <h2 className="text-4xl md:text-5xl font-black text-brand tracking-tighter leading-tight">
                            Ingeniería Molecular <br /> Aplicada a la Piel.
                        </h2>
                    </div>
                    <p className="text-slate-500 text-base max-w-xs leading-relaxed italic border-l-2 border-nature pl-4 mt-4 md:mt-0 text-pretty">
                        "Ciencia aplicada al cuidado de tu piel. Fórmulas minimalistas, resultados máximos."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* BLOQUE 01: FÓRMULAS */}
                    <div className="md:col-span-2 bg-slate-200 rounded-3xl p-10 flex flex-col justify-center items-center text-center border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-xl/20 hover:-translate-y-1 cursor-pointer">
                        <span className="material-symbols-outlined mb-6 text-4xl text-slate-900" style={{ fontSize: '50px' }}>biotech</span>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight text-slate-900">Fórmulas de Potencia Clínica</h3>
                            <p className="text-slate-700 leading-relaxed text-pretty text-sm">
                                Desarrollamos bajo estándares farmacéuticos. Sin fragancias ni colorantes. Solo activos reales en su máxima concentración permitida.
                            </p>
                        </div>
                    </div>

                    {/* BLOQUE 02: CARRUSEL */}
                    <div className="md:col-span-2 h-[300px] md:h-auto rounded-3xl overflow-hidden relative group  transition-all duration-300 hover:border-slate-200 hover:shadow-xl/20 hover:-translate-y-1 cursor-pointer">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImg ? 'opacity-100' : 'opacity-0'}`}
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>

                    {/* BLOQUE 03: PUREZA*/}
                    <div className="bg-nature rounded-3xl p-10 text-white flex flex-col justify-center items-center text-center min-h-[250px] transition-all duration-300 hover:border-slate-200 hover:shadow-xl/20  hover:-translate-y-1 cursor-pointer">
                        <span className="material-symbols-outlined mb-6 text-white text-4xl" style={{ fontSize: '40px' }}>license</span>
                        <div>
                            <p className="font-bold text-xl text-white leading-snug">Pureza Certificada</p>
                            <p className="text-xs text-white/80 mt-2 ">99.9% activos grado farmacéutico.</p>
                        </div>
                    </div>

                    {/* BLOQUE 04: BOTÁNICA*/}
                    <div className="bg-brand rounded-3xl p-10 text-white flex flex-col justify-center items-center text-center min-h-[250px] transition-all duration-300 hover:border-slate-200 hover:shadow-xl/20 hover:-translate-y-1 cursor-pointer ">
                        <span className="material-symbols-outlined mb-6 text-white text-4xl" style={{ fontSize: '40px' }}>eco</span>
                        <div>
                            <p className="font-bold text-xl text-white leading-snug text-center">Botánica <br /> Cold-Pressed</p>
                            <p className="text-xs text-white/80 mt-2">Extracción en frío para preservar la potencia molecular.</p>
                        </div>
                    </div>

                    {/* BLOQUE 05: CRUELTY FREE*/}
                    <div className="bg-slate-100 rounded-3xl p-10 border border-slate-100 flex flex-col justify-center items-center text-center min-h-[250px] transition-all duration-300 hover:border-slate-200 hover:shadow-xl/20 hover:-translate-y-1 cursor-pointer">
                        <span className="material-symbols-outlined mb-6 text-slate-900 text-5xl" style={{ fontSize: '40px' }}>cruelty_free</span>
                        <div>
                            <p className="font-bold text-xl text-slate-900 leading-snug">100% Cruelty Free</p>
                            <p className="text-xs text-slate-700 mt-2">Nuestros productos no son testeados en animales.</p>
                        </div>
                    </div>

                    {/* BLOQUE 06: SUSTENTABILIDAD*/}
                    <div className="bg-[#f6ddda] rounded-3xl p-10 border border-slate-100 flex flex-col justify-center items-center text-center min-h-[250px] transition-all duration-300 hover:border-slate-200 hover:shadow-xl/20 hover:-translate-y-1 cursor-pointer">
                        <span className="material-symbols-outlined mb-6 text-slate-900 text-4xl" style={{ fontSize: '40px' }}>recycling</span>
                        <div>
                            <p className="font-bold text-xl text-slate-900 leading-snug">Packaging Consciente</p>
                            <p className="text-xs text-slate-700 mt-2">Vidrio reciclable y reducción de huella de carbono.</p>
                        </div>
                    </div>

                </div>

                <div className="mt-32 mb-20 text-center border-t border-slate-100 pt-20">
                    <span className="material-symbols-outlined text-brand text-5xl mb-6">
                        description
                    </span>
                    <h3 className="text-3xl font-black text-brand tracking-tighter mb-4">
                        Transparencia Científica
                    </h3>
                    <p className="text-brand max-w-xl mx-auto mb-10 leading-relaxed">
                        Publicamos los resultados de nuestros ensayos clínicos y análisis de estabilidad. 
                        Creemos en una cosmética basada en datos, no en promesas.
                    </p>
                    
                    <a 
                        href="/estudios" 
                        className="inline-flex items-center gap-2 bg-brand text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#83A982]/20"
                    >
                        Ver Estudios Clínicos
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>
        </main>

        <Footer />
        </>
    );
};

export default Laboratorio;