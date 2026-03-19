import React from 'react';

const DeleteProductModal = ({ product, onClose, onDelete }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Icono de Advertencia */}
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>

          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            ¿Eliminar activo?
          </h2>

          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Estás por eliminar <span className="font-bold text-slate-700 italic">"{product.name}"</span> del inventario. Esta acción es permanente.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
          >
            Cancelar
          </button>

          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 py-2.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            Sí, Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;