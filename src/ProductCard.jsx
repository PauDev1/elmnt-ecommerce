const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col group">
      
      <div className="relative aspect-[4/5] bg-[#f6f7f8] mb-6 overflow-hidden rounded-lg">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        
       
        <button className="absolute bottom-4 left-4 right-4 bg-white/90 py-3 text-[10px] font-bold uppercase tracking-[0.2em] translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-sm cursor-pointer">
          Agregar al carrito
        </button>

        
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-black text-white text-[8px] px-2 py-1 uppercase tracking-widest">
            Sin Stock
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {product.category}
        </span>
        <h4 className="text-[#0f1829] font-medium text-lg leading-tight">
          {product.name}
        </h4>
        <p className="text-slate-500 text-sm mb-2 font-light">
          {product.description}
        </p>
        <span className="text-[#0f1829] font-bold">
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;