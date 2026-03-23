import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import CustomToast from '../components/CustomToast';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('');
  const { cartItems, addToCart, removeItem, updateQuantity } = useCartContext();

  const product = products.find((p) => p.id === id);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  const cartItem = cartItems.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center uppercase tracking-widest text-xs font-light text-slate-400">Cargando...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    toast.custom((t) => (
      <CustomToast label=" ELMNT - Shopping Bag " message="PRODUCTO AÑADIDO" type="success" />
    ));
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, cartItem.quantity + 1);
    toast.custom((t) => (
      <CustomToast label=" ELMNT - Shopping Bag " message="CANTIDAD ACTUALIZADA" type="success" />
    ));
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
      toast.custom((t) => (
        <CustomToast label=" ELMNT - Shopping Bag " message="CANTIDAD ACTUALIZADA" type="success" />
      ));
    } else {
      removeItem(product.id);
      toast.custom((t) => (
        <CustomToast label=" ELMNT - Shopping Bag " message="PRODUCTO ELIMINADO" type="error" />
      ));
    }
  };

  const handleRemoveFromCart = () => {
    removeItem(product.id);
    toast.custom((t) => (
      <CustomToast
        label=" ELMNT - Shopping Bag "
        message="PRODUCTO ELIMINADO"
        type="error"
      />
    ));
  };

  const sections = [
    { id: 'usage', title: 'Modo de Uso', content: product.usage || "Aplicar sobre la piel limpia según necesidad." },
    { id: 'ingredients', title: 'Ingredientes (INCI)', content: product.ingredients || "Aqua, Glycerin, Phenoxyethanol." },
  ];

  return (
    <>
      <div className="min-h-screen bg-white pt-24 md:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] mb-6 hover:opacity-50 transition-opacity cursor-pointer">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10">

            <div className="flex items-center justify-center p-2">
              <img
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-[500px] object-contain rounded-2xl shadow-2xl  "
              />
            </div>

            <div className="flex flex-col pt-4 px-2 md:px-0">
              <div className="mb-8">
                <span className="text-[10px] md:text-[11px] uppercase tracking-ultra text-slate-400 block mb-2">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-brand uppercase italic leading-tight mb-6">{product.name}</h1>


                <p className="text-base md:text-lg text-slate-600 leading-relaxed font-normal tracking-wide mb-8 max-w-xl italic">
                  {product.description}
                </p>

                <div className="flex justify-between items-end mt-6 border-t border-slate-100 pt-6">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-medium italic">Presentación: {product.volume}</span>
                  <p className="text-3xl font-bold text-brand tracking-tight">${product.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-10">
                {cartItem ? (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center justify-between border border-brand p-4 rounded-lg bg-white">

                      <button onClick={handleDecreaseQuantity} className="hover:opacity-50 px-2">
                        <span className="material-symbols-outlined text-base cursor-pointer">remove</span>
                      </button>

                      <span className="text-[11px] font-bold tracking-[0.25em] text-brand">
                        {cartItem.quantity} UNIDADES
                      </span>

                      <button
                        onClick={handleIncreaseQuantity}
                        disabled={cartItem.quantity >= product.stock}
                        className="hover:opacity-50 px-2 disabled:opacity-20 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>

                    <button
                      onClick={handleRemoveFromCart}
                      className="w-14 h-14 border border-slate-200 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined font-light text-xl">delete</span>
                    </button>
                  </div>
                ) : (

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`w-full py-5 rounded-lg text-[10px] uppercase tracking-[0.2em] cursor-pointer font-bold transition-all
                    ${product.stock > 0 ? 'bg-brand text-white hover:bg-slate-800 shadow-xl' : 'bg-slate-100 text-slate-400'}`}
                  >
                    {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                  </button>
                )}
              </div>
              <div className="border-t border-slate-100 ">
                {sections.map((section) => (
                  <div key={section.id} className="border-b border-slate-100">
                    <button
                      onClick={() => setOpenSection(openSection === section.id ? '' : section.id)}
                      className="w-full py-5 flex justify-between items-center text-[10px] uppercase cursor-pointer tracking-[0.25em] font-bold text-brand hover:bg-slate-50/50 transition-colors px-1"
                    >
                      {section.title}
                      <span className={`material-symbols-outlined text-lg text-slate-400 font-light transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : 'rotate-0'}`}>
                        keyboard_arrow_down
                      </span>
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${openSection === section.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="pb-8 pt-1 text-sm text-slate-500 leading-relaxed font-light tracking-wide px-1 max-w-xl">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="pt-12 md:pt-24 pb-0  border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-8">
                <h3 className="text-xl md:text-2xl font-bold tracking-tighter uppercase italic text-brand">Podría interesarte</h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Sugerencias</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map(item => <ProductCard key={item.id} product={item} />)}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;