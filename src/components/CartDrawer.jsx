import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  
  const { cartItems, isCartOpen, toggleCart, addToCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const SHIPPING_THRESHOLD = 200;
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const remaining = SHIPPING_THRESHOLD - total;
  const progress = Math.min((total / SHIPPING_THRESHOLD) * 100, 100);

  const handleCheckout = () => {
    toggleCart(); 
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay - Fondo oscuro */}
      <div
        className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleCart}
      />

      {/* Drawer - Carrito lateral */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold tracking-ultra text-primary">Shopping Bag</h3>
              <p className="text-[11px] text-slate-400 uppercase tracking-tighter mt-1 font-medium">
                {totalItems} {totalItems === 1 ? 'Ítem seleccionado' : 'Ítems seleccionados'}
              </p>
            </div>
            <button onClick={toggleCart} className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer">close</button>
          </div>

          {/* Barra de Envío */}
          <div className="px-6 py-4">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">
                  {remaining > 0 ? 'local_shipping' : 'verified'}
                </span>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  {remaining > 0
                    ? `Te faltan $${remaining.toLocaleString()} para el envío gratis`
                    : "¡Felicidades! Tenés envío gratis"}
                </p>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0f1829] transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <span className="material-symbols-outlined text-6xl mb-2 font-light">shopping_bag</span>
                <p className="text-[10px] uppercase tracking-[0.2em]">Tu bolsa está vacía</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase text-[#0f1829]">{item.name}</h4>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest">{item.volume}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 cursor-pointer">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-[#0f1829] "
                        >-</button>
                        <span className="px-2 text-[10px] font-bold">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          disabled={item.quantity >= item.stock}
                          className={`w-6 h-6 flex items-center justify-center ${item.quantity >= item.stock ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-[#0f1829]'}`}
                        >+</button>
                      </div>
                      <p className="text-[11px] font-bold text-[#0f1829]">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-8 border-t border-slate-100 bg-white">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold tracking-tight pt-4 border-t border-slate-100 text-[#0f1829]">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#0f1829] text-white py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase cursor-pointer hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/5 active:scale-95">
                Finalizar Compra
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;