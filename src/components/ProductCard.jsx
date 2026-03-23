import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleCart, cartItems } = useCartContext();

  const itemInCart = cartItems.find(item => item.id === product.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;
  const isOutOfStock = product.stock === 0;
  const hasReachedMax = quantityInCart >= product.stock;

  const optimizedImage = product.image.replace(
    '/upload/',
    '/upload/w_400,c_limit,q_auto,f_auto/'
  );

  const handleAdd = (e) => {
    e.stopPropagation(); 
    e.preventDefault();  
    if (!isOutOfStock && !hasReachedMax) {
      addToCart(product);
      toggleCart();
    }
  };

  return (

    <div className="flex flex-col group h-full">
      <Link to={`/product/${product.id}`} className="block mb-6">
        <div className="relative aspect-square bg-[#f6f7f8] overflow-hidden rounded-lg">
            <img
            src={optimizedImage} 
            alt={product.name}
            width="400" // 
            height="400"
            loading="lazy" 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          {(!isOutOfStock && !hasReachedMax) && (
            <button
              onClick={handleAdd}
              className="md:hidden absolute bottom-2 right-2 bg-[#0f1829] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 z-10"
            >
              <span className="material-symbols-outlined text-[20px] font-light">add</span>
            </button>
          )}

          {(!isOutOfStock && !hasReachedMax) && (
            <button
              onClick={handleAdd}
              className="hidden md:block absolute bottom-4 left-4 right-4 bg-white/90 py-3 text-[10px] font-bold uppercase tracking-[0.2em] translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-sm cursor-pointer"
            >
              Agregar al carrito
            </button>
          )}

          {(isOutOfStock || hasReachedMax) && (
            <div className="absolute top-4 left-4 bg-black text-white text-[8px] px-2 py-1 uppercase tracking-widest z-10">
              Sin Stock
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 px-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-[#0f1829] font-medium text-lg leading-tight min-h-[2.5rem] line-clamp-2 mt-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-slate-500 text-sm mb-3 font-normal line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50 pb-2">
          <span className="text-[#0f1829] font-bold">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 uppercase tracking-widest font-normal">
            {product.volume}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;