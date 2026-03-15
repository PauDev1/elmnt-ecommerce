import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm animate-pulse">
      {/* Contenedor de imagen */}
      <div className="aspect-square w-full bg-slate-200 rounded-lg mb-6"></div>
      
      {/* Líneas de texto */}
      <div className="space-y-3">
        <div className="h-3 bg-slate-200 rounded-full w-3/4"></div>
        <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
        
        {/* Simulación de botón */}
        <div className="h-9 bg-slate-100 rounded-lg w-full mt-4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;