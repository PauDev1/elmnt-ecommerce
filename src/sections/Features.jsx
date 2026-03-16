const Features = () => {
    return (
        <section className="py-24 px-6 bg-[#f6f7f8]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-bold text-[#0f1829] mb-6 tracking-tight">El Estándar ELMNT</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 font-light italic">
                Cada formulación se desarrolla internamente en nuestro laboratorio certificado ISO, asegurando que cada molécula cumpla una función biológica precisa sin relleno ni fragancia.
              </p>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#0f1829] pb-1 inline-block">Conocé nuestro proceso</a>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
              {[
                { icon: "biotech", title: "Bio-disponibilidad Molecular", desc: "Partículas diseñadas para penetrar efectivamente la barrera lipídica." },
                { icon: "thermostat", title: "Tecnología de Proceso Frío", desc: "Preservando la integridad activa al evitar la degradación térmica." },
                { icon: "verified_user", title: "Verificación de Pureza", desc: "Pruebas de cromatografía de terceros en cada lote." }
              ].map((box, i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
                  <div className="text-[#0f1829] mb-4">
                    <span className="material-symbols-outlined text-2xl">{box.icon}</span>
                  </div>
                  <h5 className="font-bold text-[10px] uppercase tracking-wider mb-2">{box.title}</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
};

export default Features;