import React, { useState } from 'react';

const initialFormState = {
  name: '',
  description: '',
  price: '',
  category: '',
  volume: '',
  volumeUnit: '',
  stock: '',
  image: ''
};

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = (product) => {
    let newErrors = {};
    const sqlInjectionPattern = /[<>]/g;

    if (!product.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (sqlInjectionPattern.test(product.name)) {
      newErrors.name = "No se permiten caracteres especiales";
    }

    if (!product.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    } else if (sqlInjectionPattern.test(product.description)) {
      newErrors.description = "No se permiten etiquetas de código";
    }

    if (!product.category) newErrors.category = "Debes elegir una categoría";
    
    if (!product.volume || Number(product.volume) <= 0) {
      newErrors.volume = "Ingresa una cantidad válida";
    }
    
    if (!product.volumeUnit) newErrors.volumeUnit = "Selecciona ML o GR";

    if (!product.price || product.price === '') {
      newErrors.price = "El precio es obligatorio";
    } else if (Number(product.price) < 5) {
      newErrors.price = "El precio mínimo es de 5";
    }

    if (product.stock === '' || product.stock === undefined) {
      newErrors.stock = "El stock inicial es obligatorio";
    } else if (Number(product.stock) < 0) {
      newErrors.stock = "No puede ser negativo";
    }

    if (!product.image || product.image.trim() === '') {
      newErrors.image = "La URL es obligatoria";
    } else if (!product.image.startsWith("https://res.cloudinary.com/")) {
      newErrors.image = "Debe ser un enlace de Cloudinary válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setNewProduct(initialFormState);
    setErrors({});
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(newProduct)) {
      onAddProduct({
        ...newProduct,
        volume: `${newProduct.volume}${newProduct.volumeUnit}`,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      });
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tighter italic text-slate-800">Registrar Nuevo Producto</h2>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Nombre Comercial</label>
              <input
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-slate-100'
                }`}
              />
              {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.name}</p>}
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Descripción Técnica</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                autoComplete="off"
                className={`w-full block resize-none bg-slate-50 border rounded-lg p-2.5 text-sm h-20 focus:outline-none focus:ring-2 transition-all ${
                  errors.description ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-slate-100'
                }`}
              />
              {errors.description && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4 col-span-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Categoría</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${
                    errors.category ? 'border-red-400' : 'border-slate-200'
                  }`}
                >
                  <option value="" disabled>Seleccionar...</option>
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
                    name="volume"
                    placeholder="Ej: 150"
                    value={newProduct.volume}
                    onChange={handleChange}
                    className={`flex-1 min-w-0 bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${
                      errors.volume ? 'border-red-400' : 'border-slate-200'
                    }`}
                  />
                  <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
                    {['ml', 'gr'].map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => setNewProduct({ ...newProduct, volumeUnit: unit })}
                        className={`px-2 py-1 rounded-md text-[9px] font-black uppercase transition-all ${
                          newProduct.volumeUnit === unit ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-400'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
                {(errors.volume || errors.volumeUnit) && (
                  <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">
                    {errors.volume || errors.volumeUnit}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Precio</label>
              <input
                name="price"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${
                  errors.price ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-slate-100'
                }`}
              />
              {errors.price && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.price}</p>}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Stock Inicial</label>
              <input
                name="stock"
                type="number"
                value={newProduct.stock}
                onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${
                  errors.stock ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-slate-100'
                }`}
              />
              {errors.stock && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.stock}</p>}
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">URL Imagen (Cloudinary)</label>
              <input
                name="image"
                placeholder="https://res.cloudinary.com/..."
                value={newProduct.image}
                onChange={handleChange}
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${
                  errors.image ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-slate-100'
                }`}
              />
              {errors.image && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.image}</p>}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button type="button" onClick={handleClose} className="flex-1 py-3 text-xs font-bold uppercase text-slate-400 hover:bg-slate-50 rounded-xl transition-all">Cancelar</button>
            <button type="submit" className="flex-1 py-3 bg-[#0f1829] text-white text-xs font-bold uppercase rounded-xl hover:bg-slate-800 shadow-lg transition-all">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;