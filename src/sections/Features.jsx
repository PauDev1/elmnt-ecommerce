import { Link } from 'react-router-dom';

const Features = () => {
    return (
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-brand mb-6 tracking-tight uppercase">El Estándar ELMNT</h2>
              <p className="text-body text-sm leading-relaxed mb-8 font-normal italic">
                Cada formulación se desarrolla internamente en nuestro laboratorio certificado ISO, asegurando que cada molécula cumpla una función biológica precisa sin relleno ni fragancia.
              </p>
              <a href="/laboratorio" className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-brand pb-1 inline-block">Conocé nuestro proceso</a>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6 ">
              {[
                { icon: "biotech", title: "Bio-disponibilidad Molecular", desc: "Partículas diseñadas para penetrar efectivamente la barrera lipídica." },
                { icon: "thermostat", title: "Tecnología de Proceso Frío", desc: "Preservando la integridad activa al evitar la degradación térmica." },
                { icon: "verified_user", title: "Verificación de Pureza", desc: "Pruebas de cromatografía de terceros en cada lote." }
              ].map((box, i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-surface flex flex-col items-center text-center">
                  <div className="text-brand mb-4 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">{box.icon}</span>
                  </div>
                  <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 text-brand">{box.title}</h3>
                  <p className="text-[11px] text-muted leading-relaxed font-normal">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
};

export default Features;