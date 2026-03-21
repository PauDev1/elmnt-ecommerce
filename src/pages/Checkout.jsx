import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('elmnt_checkout_data');
    const initialState = {
      nombre: '', email: '', direccion: '', ciudad: '', cp: '',
      tarjeta: '', vencimiento: '', cvv: ''
    };
    return savedData ? { ...initialState, ...JSON.parse(savedData) } : initialState;
  });

  const [errors, setErrors] = useState({});

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value.replace(/[<>]/g, "");

    if (name === 'tarjeta') {
      cleanValue = value.replace(/\D/g, '').substring(0, 16);
      cleanValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    if (name === 'vencimiento') {
      cleanValue = value.replace(/\D/g, '').substring(0, 4);
      if (cleanValue.length >= 2) {
        cleanValue = cleanValue.substring(0, 2) + '/' + cleanValue.substring(2);
      }
    }

    if (name === 'cvv') {
      cleanValue = value.replace(/\D/g, '').substring(0, 3);
    }

    setFormData({ ...formData, [name]: cleanValue });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombre.trim()) tempErrors.nombre = "EL NOMBRE ES OBLIGATORIO";
    if (!emailRegex.test(formData.email)) tempErrors.email = "EMAIL INVÁLIDO";
    if (!formData.direccion.trim()) tempErrors.direccion = "LA DIRECCIÓN ES OBLIGATORIA";
    if (!formData.ciudad.trim()) tempErrors.ciudad = "CAMPO OBLIGATORIO";
    if (!formData.cp.trim()) tempErrors.cp = "CAMPO OBLIGATORIO";

    if (Object.keys(tempErrors).length === 0) {
      const dataToSave = {
        nombre: formData.nombre,
        email: formData.email,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
        cp: formData.cp
      };
      localStorage.setItem('elmnt_checkout_data', JSON.stringify(dataToSave));

      setStep(2);
      window.scrollTo(0, 0);
    } else {
      setErrors(tempErrors);
    }    
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    let tempErrors = {};


    const tarjetaLimpia = formData.tarjeta.replace(/\s/g, "");
    if (tarjetaLimpia.length < 16) tempErrors.tarjeta = "NÚMERO INCOMPLETO";

    if (!/^\d{2}\/\d{2}$/.test(formData.vencimiento)) {
      tempErrors.vencimiento = "FORMATO MM/YY";
    } else {
      const [mes, año] = formData.vencimiento.split('/').map(Number);
      const hoy = new Date();
      const añoActualShort = hoy.getFullYear() % 100;
      const mesActual = hoy.getMonth() + 1;

      if (año < añoActualShort || (año === añoActualShort && mes < mesActual) || mes > 12 || mes === 0) {
        tempErrors.vencimiento = "TARJETA VENCIDA O FECHA INVÁLIDA";
      }
    }

    if (formData.cvv.length < 3) tempErrors.cvv = "CVV INVÁLIDO";

    if (Object.keys(tempErrors).length === 0) {
      setShowSuccess(true);
      clearCart();
      localStorage.removeItem('elmnt_checkout_data');
    } else {
      setErrors(tempErrors);
    }
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Tu bolsa está vacía</h2>
        <button onClick={() => navigate('/')} className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 cursor-pointer">Volver a la tienda</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] pt-28 pb-20 px-4 md:px-6 relative font-sans">

      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f1829]/60 backdrop-blur-md" />
          <div className="bg-white p-10 rounded-3xl shadow-2xl relative z-10 max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
            <span className="material-symbols-outlined text-green-500 mb-4" style={{ fontSize: '40px' }}>credit_score</span>
            <h3 className="text-2xl font-bold text-[#0f1829] mb-2 italic uppercase tracking-tighter">¡Pedido Confirmado!</h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-10 px-4">¡Gracias por tu compra, {formData.nombre.split(' ')[0].charAt(0).toUpperCase() + formData.nombre.split(' ')[0].slice(1).toLowerCase()}! <br /> Revisa tu bandeja de entrada para ver el detalle de tu pedido.</p>
            <button onClick={() => navigate('/')} className="w-full bg-[#0f1829] text-white py-4 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-black transition-all cursor-pointer">Ir al inicio</button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-full">
          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h3 className="text-xl font-bold uppercase tracking-tighter italic mb-8 border-b pb-4 text-[#0f1829]">1. Detalles de Entrega</h3>
              <form onSubmit={handleNextStep} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Nombre Completo</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.nombre ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                  {errors.nombre && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                  {errors.email && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Dirección</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.direccion ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                    {errors.direccion && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.direccion}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Ciudad</label>
                    <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.ciudad ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                    {errors.ciudad && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.ciudad}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">CP</label>
                    <input type="text" name="cp" value={formData.cp} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.cp ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                    {errors.cp && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.cp}</p>}
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#0f1829] text-white py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase mt-4 hover:bg-black transition-colors cursor-pointer">Siguiente paso</button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h3 className="text-xl font-bold uppercase tracking-tighter italic text-[#0f1829]">2. Método de Pago</h3>
                <button onClick={() => setStep(1)} className="text-[10px] font-bold uppercase text-slate-400 italic hover:text-black cursor-pointer">← Volver</button>
              </div>

              <form onSubmit={handleSubmitFinal} className="space-y-6 flex flex-col flex-grow">
                <div className="w-full max-w-[340px] mx-auto aspect-[1.58/1] bg-gradient-to-br from-slate-800 to-black p-6 rounded-2xl mb-8 relative shadow-2xl self-center flex flex-col justify-between overflow-hidden">
                  <div className="w-12 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md shadow-inner" />
                  <p className="text-white text-lg tracking-[0.25em] font-mono my-4">{formData.tarjeta || '•••• •••• •••• ••••'}</p>
                  <div className="flex justify-between items-end">
                    <p className="text-white/90 text-[10px] uppercase font-medium truncate max-w-[170px]">{formData.nombre || 'NOMBRE DEL TITULAR'}</p>
                    <p className="text-white/90 text-[10px] font-mono">{formData.vencimiento || 'MM/YY'}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Número de Tarjeta</label>
                    <input type="text" name="tarjeta" value={formData.tarjeta} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.tarjeta ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                    {errors.tarjeta && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.tarjeta}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Vencimiento</label>
                      <input type="text" name="vencimiento" placeholder="MM/YY" value={formData.vencimiento} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.vencimiento ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                      {errors.vencimiento && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.vencimiento}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">CVV</label>
                      <input type="password" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} className={`w-full p-4 bg-slate-50 rounded-xl text-xs outline-none border transition-all ${errors.cvv ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#0f1829]'}`} />
                      {errors.cvv && <p className="text-[9px] text-red-500 mt-1 uppercase font-bold">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#0f1829] text-white py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase mt-auto hover:bg-black shadow-xl transition-all cursor-pointer">Confirmar Pago • ${total.toLocaleString()}</button>
              </form>
            </div>
          )}
        </div>

        <div className="bg-[#0f1829] text-white p-8 rounded-[2rem] shadow-2xl flex flex-col h-full lg:sticky lg:top-28">
          <h3 className="text-lg font-bold uppercase tracking-tighter italic mb-6 border-b border-white/10 pb-4">Tu Pedido</h3>
          <div className="space-y-4 flex-grow overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">

            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded-xl object-cover border border-white/20"
                      alt={item.name}
                    />
                    <span className="absolute top-0 right-0 bg-white text-[#0f1829] min-w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-black shadow-lg px-1">
                      {item.quantity}
                    </span>
                  </div>
                  <span className="text-white/80 uppercase tracking-widest font-medium max-w-[180px] sm:max-w-[220px] truncate">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold tracking-tight text-sm">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/60">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/60">
              <span>Envío</span>
              <span className="text-green-400 font-bold uppercase">Gratis</span>
            </div>
            <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/30">
              <span className="italic uppercase tracking-tighter">Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;