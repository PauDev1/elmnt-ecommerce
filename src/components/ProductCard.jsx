import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart, toggleCart, cartItems } = useCart();

  const itemInCart = cartItems.find(item => item.id === product.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  const isOutOfStock = product.stock === 0;
  const hasReachedMax = quantityInCart >= product.stock;

  const handleAdd = () => {
    if (!isOutOfStock && !hasReachedMax) {
      addToCart(product);
      toggleCart();
    }
  };

  return (

    <div className="flex flex-col group h-full">

      <div className="relative aspect-[4/5] bg-[#f6f7f8] mb-6 overflow-hidden rounded-lg shrink-0">
        <img
          src={product.image}
          alt={product.name}
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

      {/* <div className="flex flex-col flex-1 px-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {product.category}
        </span>

        <h4 className="text-[#0f1829] font-medium text-lg leading-tight min-h-[3rem] line-clamp-2 mt-1">
          {product.name}
        </h4>

        <p className="text-slate-500 text-sm mb-4 font-light line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pb-2">
          <span className="text-[#0f1829] font-bold">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 uppercase tracking-widest font-light">
            {product.volume}
          </span>
        </div>
      </div> */}

      <div className="flex flex-col flex-1 px-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {product.category}
        </span>

        {/* Bajamos el min-h o lo quitamos para que no ocupe tanto espacio si el nombre es corto */}
        <h4 className="text-[#0f1829] font-medium text-lg leading-tight min-h-[2.5rem] line-clamp-2 mt-1">
          {product.name}
        </h4>

        <p className="text-slate-500 text-sm mb-3 font-light line-clamp-2">
          {product.description}
        </p>

        {/* CAMBIO: Quitamos 'mt-auto' y usamos un borde superior sutil para separar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50 pb-2">
          <span className="text-[#0f1829] font-bold">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 uppercase tracking-widest font-light">
            {product.volume}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;