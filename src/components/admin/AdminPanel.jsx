import React, { useState } from 'react';

const AdminPanel = ({ products, onUpdateProduct, onDeleteProduct, onAddProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const itemsPerPage = 6;

  const initialFormState = {
    name: '', description: '', price: '', category: '', volume: '', volumeUnit: '', stock: '', image: ''
  };
  const [newProduct, setNewProduct] = useState(initialFormState);

  // Filtro de búsqueda Admin
  const filteredAdminProducts = products.filter(p =>
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  // Lógica de Paginación
  const totalPages = Math.ceil(filteredAdminProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdminProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCloseModal = () => {
    setNewProduct(initialFormState); // Limpia los campos al valor inicial
    setErrors({});                  // Borra todos los mensajes de rojo
    setIsModalOpen(false);          // Recién ahí cierra el modal
  };

  const validateForm = (product) => {
    let newErrors = {};
    const sqlInjectionPattern = /[<>]/g;

    if (!product.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (sqlInjectionPattern.test(product.name)) {
      newErrors.name = "No se permiten caracteres especiales como < o >";
    }
    if (!product.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    } else if (sqlInjectionPattern.test(product.description)) {
      newErrors.description = "No se permiten etiquetas de código en la descripción";
    }
    if (!product.category) {
      newErrors.category = "Debes elegir una categoría";
    }
    if (!product.volume || Number(product.volume) <= 0) {
      newErrors.volume = "Ingresa una cantidad válida";
    }
    if (!product.volumeUnit) {
      newErrors.volumeUnit = "Selecciona ML o GR";
    }
    // Validación de Precio: Obligatorio + Mínimo 5
    if (!product.price || product.price === '') {
      newErrors.price = "El precio es obligatorio";
    } else if (Number(product.price) < 5) {
      newErrors.price = "El precio mínimo es de 5";
    }

    // Validación de Stock: Obligatorio + No negativo
    if (product.stock === '' || product.stock === undefined) {
      newErrors.stock = "El stock inicial es obligatorio";
    } else if (Number(product.stock) < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    // Validación de Cloudinary
    if (!product.image || product.image.trim() === '') {
      newErrors.image = "La URL de la imagen es obligatoria";
    } else if (!product.image.startsWith("https://res.cloudinary.com/")) {
      newErrors.image = "La imagen debe ser un enlace de Cloudinary válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm(newProduct);

    if (isValid) {
      // 1. Preparamos el objeto final combinando volumen y unidad
      const productData = {
        ...newProduct,
        // Concatenamos el número con la unidad (ej: "150ml")
        volume: `${newProduct.volume}${newProduct.volumeUnit}`,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      };

      // 2. Quitamos el campo auxiliar volumeUnit para que no ensucie la base de datos
      delete productData.volumeUnit;

      // 3. Enviamos el producto limpio
      onAddProduct(productData);

      // 4. Reset total del estado
      setIsModalOpen(false);
      setNewProduct(initialFormState);
      setErrors({});
      showToast("Producto registrado con éxito");
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ENCABEZADO ESTILO LABORATARIO */}
        <div className="mb-8">
          <h1 className="text-xl font-bold uppercase tracking-tighter italic text-primary text-center md:text-left">Administración de Inventario</h1>
          {/* <p className="text-slate-500 text-sm mt-1">Repositorio central de activos químicos y formulaciones de precisión.</p> */}
        </div>

        {/* BARRA DE ACCIONES */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">search</span>
            <input
              type="text"
              placeholder="Buscar en el inventario..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 text-sm transition-all"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-[#0f1829] text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Añadir Producto
          </button>
        </div>

        {/* TABLA PRODUCTOS */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">ID</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Visual</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Nombre</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Categoría</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Stock</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Precio</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {currentItems.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/30 transition-colors group">
                    {/* ID MONOESPACIADO */}
                    <td className="p-4 text-xs font-mono text-slate-400">#{prod.id?.slice(-5) || "---"}</td>

                    {/* MINIATURA DE IMAGEN */}
                    <td className="p-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg p-1 border border-slate-100">
                        <img src={prod.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    </td>

                    {/* NOMBRE Y DESCRIPCIÓN RESPONSIVA */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm">{prod.name}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[100px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[600px]">
                          {prod.description}
                        </span>
                      </div>
                    </td>

                    {/* CATEGORÍA */}
                    <td className="p-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase tracking-tighter">
                        {prod.category}
                      </span>
                    </td>

                    {/* STOCK */}
                    <td className="p-4 text-center">
                      <span className={`text-xs font-bold ${prod.stock < 5 ? 'text-red-500' : 'text-emerald-600'}`}>
                        {prod.stock}
                      </span>
                    </td>

                    {/* PRECIO */}
                    <td className="p-4">
                      <div className="flex items-center text-slate-700 font-bold text-sm">
                        <span className="text-[10px] mr-0.5">$</span>
                        <span>{Number(prod.price).toFixed(2)}</span>
                      </div>
                    </td>

                    {/* ACCIONES (ICONOS) */}
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-2 text-slate-400 hover:text-[#0f1829] hover:bg-slate-100 rounded-lg transition-all">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => setProductToDelete(prod)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* PIE DE TABLA */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col items-center gap-6">

            {/* Botones de Paginación */}
            <div className="flex items-center gap-2">
              {/* Anterior */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded- bg-white text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-[#0f1829] transition-all"
              >
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>

              {/* Números */}
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-all ${currentPage === i + 1
                      ? 'bg-[#0f1829] text-white shadow-md scale-110 z-10'
                      : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Siguiente */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-white text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-[#0f1829] transition-all"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>

            {/* Contador */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {/* Mostrando <span className="text-slate-600">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredAdminProducts.length)}</span> de {filteredAdminProducts.length} activos */}
              Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredAdminProducts.length)} de {filteredAdminProducts.length} activos
            </p>
          </div>
        </div>
      </div>

      {/* MODAL AGREGAR */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tighter italic text-slate-800">Registrar Nuevo Producto</h2>
                {/* <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-bold">Formulación de Grado A</p> */}
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
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
                    className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name
                      ? 'border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:ring-slate-100'
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
                    className={`w-full block resize-none bg-slate-50 border rounded-lg p-2.5 text-sm h-20 focus:outline-none focus:ring-2 transition-all ${errors.description
                      ? 'border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:ring-slate-100'
                      }`}
                  />
                  {errors.description && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">
                      {errors.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 col-span-2">
                  {/* CATEGORÍA */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                      Categoría
                    </label>
                    <select
                      name="category"
                      value={newProduct.category}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${errors.category ? 'border-red-400' : 'border-slate-200'
                        }`}
                    >
                      <option value="" disabled>Seleccionar...</option>
                      <option value="Cleansers">Limpieza</option>
                      <option value="Hydration">Hidratación</option>
                      <option value="Treatment">Serums</option>
                      <option value="Protection">Protectores</option>
                    </select>
                    {errors.category && (
                      <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.category}</p>
                    )}
                  </div>

                  {/* VOLUMEN / PRESENTACIÓN */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                      Volumen / Presentacion
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        name="volume"
                        placeholder="Ej: 150"
                        value={newProduct.volume}
                        onChange={handleChange}
                        className={`flex-1 min-w-0 bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${errors.volume ? 'border-red-400' : 'border-slate-200'
                          }`}
                      />
                      <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
                        {['ml', 'gr'].map((unit) => (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => setNewProduct({ ...newProduct, volumeUnit: unit })}
                            className={`px-2 py-1 rounded-md text-[9px] font-black uppercase transition-all ${newProduct.volumeUnit === unit
                              ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                              : 'text-slate-400 hover:text-slate-600'
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
                {/* CAMPO PRECIO */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Precio</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${errors.price ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-slate-100'
                      }`}
                  />
                  {errors.price && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.price}</p>
                  )}
                </div>

                {/* CAMPO STOCK */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Stock Inicial</label>
                  <input
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${errors.stock ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-slate-100'
                      }`}
                  />
                  {errors.stock && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.stock}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                    URL de Imagen (Cloudinary)
                  </label>
                  <input
                    name="image"
                    placeholder="https://res.cloudinary.com/..."
                    value={newProduct.image}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border rounded-lg p-2.5 text-sm focus:outline-none transition-all ${errors.image
                      ? 'border-red-400 focus:ring-red-50'
                      : 'border-slate-200 focus:ring-slate-100'
                      }`}
                  />
                  {errors.image && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 rounded-xl transition-all">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-[#0f1829] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN  */}
      {editingProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tighter italic text-slate-800">Editar Producto</h2>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-bold">ID: #{editingProduct.id?.slice(-5)}</p>
              </div>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateProduct(editingProduct.id, editingProduct);
                setEditingProduct(null);
                showToast("Cambios guardados con éxito");
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Nombre Comercial</label>
                  <input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Descripción Técnica</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Categoría</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none"
                  >
                    <option value="Cleansers">Limpieza</option>
                    <option value="Hydration">Hidratación</option>
                    <option value="Treatment">Serums</option>
                    <option value="Protection">Protectores</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Volumen/Presentación</label>
                  <input
                    name="volume"
                    value={editingProduct.volume}
                    onChange={(e) => setEditingProduct({ ...editingProduct, volume: e.target.value })}
                    placeholder="Ej: 150ml"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Stock Actual</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">URL de Imagen</label>
                  <input
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 rounded-xl transition-all">Descartar</button>
                <button type="submit" className="flex-1 py-3 bg-[#0f1829] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all">Actualizar Datos</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {productToDelete && (
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
                Estás por eliminar <span className="font-bold text-slate-700 italic">"{productToDelete.name}"</span> del inventario. Esta acción es permanente.
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  onDeleteProduct(productToDelete.id);
                  setProductToDelete(null);
                  showToast("Producto eliminado con éxito");
                }}
                className="flex-1 py-2.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 shadow-lg shadow-red-100 transition-all active:scale-95"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* NOTIFICACIÓN FLOTANTE (TOAST) */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-4 min-w-[280px]">

            {/* Icono con pulso */}
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>

            {/* Texto del mensaje */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sistema</p>
              <p className="text-sm font-semibold text-slate-700">{toast.message}</p>
            </div>

            {/* Barrita de tiempo (animada) */}
            <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/10 w-full overflow-hidden rounded-b-2xl">
              <div className="h-full bg-emerald-500 animate-[progress_3s_linear_forwards]"
                style={{ width: '100%', transformOrigin: 'left' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;