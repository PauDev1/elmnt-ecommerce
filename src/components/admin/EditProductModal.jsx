import React, { useState, useEffect } from 'react';

const EditProductModal = ({ isOpen, product, onClose, onUpdateProduct }) => {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      const volumeValue = product.volume ? parseInt(product.volume) : '';
      const volumeUnit = product.volume ? product.volume.replace(/[0-9]/g, '').toLowerCase() : 'ml';

      setFormData({
        ...product,
        volumeNumber: volumeValue,
        volumeUnit: volumeUnit || 'ml'
      });
    }
  }, [product]);

  if (!isOpen || !formData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;
    if (name === 'volumeNumber' || name === 'price' || name === 'stock') {
      cleanValue = value.trim(); 
    }
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const validateForm = () => {
    let newErrors = {};
    const sqlInjectionPattern = /[<>]/g;

    // Nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (sqlInjectionPattern.test(formData.name)) {
      newErrors.name = "No se permiten caracteres especiales";
    }

    // Descripción
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    } else if (sqlInjectionPattern.test(formData.description)) {
      newErrors.description = "No se permiten etiquetas de código";
    }

    // Categoría
    if (!formData.category) newErrors.category = "Debes elegir una categoría";

    // Volumen 
    if (!formData.volumeNumber || Number(formData.volumeNumber) <= 0) {
      newErrors.volume = "Ingresa una cantidad válida";
    }

    // Unidad
    if (!formData.volumeUnit) newErrors.volume = "Selecciona ML o GR";

    // Precio
    if (!formData.price || formData.price === '') {
      newErrors.price = "El precio es obligatorio";
    } else if (Number(formData.price) < 5) {
      newErrors.price = "El precio mínimo es de 5";
    }

    // Stock
    if (formData.stock === '' || formData.stock === undefined) {
      newErrors.stock = "El stock inicial es obligatorio";
    } else if (Number(formData.stock) < 0) {
      newErrors.stock = "No puede ser negativo";
    }

    // Imagen
    if (!formData.image || formData.image.trim() === '') {
      newErrors.image = "La URL es obligatoria";
    } else if (!formData.image.startsWith("https://res.cloudinary.com/")) {
      newErrors.image = "Debe ser un enlace de Cloudinary válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const finalData = {
        ...formData,
        volume: `${formData.volumeNumber}${formData.volumeUnit}`,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };
      delete finalData.volumeNumber;
      delete finalData.volumeUnit;

      onUpdateProduct(finalData.id, finalData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tighter italic text-slate-800">Editar Producto</h2>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-1 tracking-widest">ID: #{formData.id?.slice(-5)}</p>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Nombre Comercial</label>
              <input name="name" value={formData.name} onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${errors.name ? 'border-red-400' : 'border-slate-200'}`} />
              {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.name}</p>}
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Descripción Técnica</label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm h-20 resize-none focus:outline-none transition-all ${errors.description ? 'border-red-400' : 'border-slate-200'}`} />
              {errors.description && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.description}</p>}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Categoría</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none">
                <option value="Cleansers">Limpieza</option>
                <option value="Hydration">Hidratación</option>
                <option value="Treatment">Serums</option>
                <option value="Protection">Protectores</option>
              </select>
              {errors.category && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.category}</p>}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Volumen</label>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  name="volumeNumber"
                  value={formData.volumeNumber}
                  onChange={handleChange}
                  className={`flex-1 min-w-0 bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none ${errors.volume ? 'border-red-400' : 'border-slate-200'}`} />
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
                  {['ml', 'gr'].map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setFormData({ ...formData, volumeUnit: unit })}
                      className={`px-2 py-1 rounded-md text-[9px] font-black uppercase transition-all ${formData.volumeUnit === unit ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
              {errors.volume && (
                <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">
                  {errors.volume}
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Precio</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none ${errors.price ? 'border-red-400' : 'border-slate-200'}`} />
              {errors.price && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.price}</p>}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Stock Actual</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none ${errors.stock ? 'border-red-400' : 'border-slate-200'}`} />
              {errors.stock && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.stock}</p>}
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">URL de Imagen</label>
              <input name="image" value={formData.image} onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none ${errors.image ? 'border-red-400' : 'border-slate-200'}`} />
              {errors.image && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.image}</p>}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button type="button" onClick={handleClose} className="flex-1 py-3 text-xs font-bold uppercase text-slate-400 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">Descartar</button>
            <button type="submit" className="flex-1 py-3 bg-brand text-white text-xs font-bold uppercase rounded-xl hover:bg-slate-800 shadow-lg transition-all cursor-pointer">Actualizar Datos</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;