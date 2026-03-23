import React, { useState } from 'react';
import AddProductModal from '../components/admin/AddProductModal';
import EditProductModal from '../components/admin/EditProductModal';
import DeleteProductModal from '../components/admin/DeleteProductModal';

const AdminPanel = ({ products, onUpdateProduct, onDeleteProduct, onAddProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const itemsPerPage = 6;

  const filteredAdminProducts = products.filter(p =>
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAdminProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdminProducts.slice(indexOfFirstItem, indexOfLastItem);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ENCABEZADO */}
        <div className="mb-8">
          <h1 className="text-xl font-bold uppercase tracking-tighter italic text-brand text-center md:text-left">Administración de Inventario</h1>
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
            className="w-full md:w-auto bg-brand cursor-pointer text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
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
                    {/* ID  */}
                    <td className="p-4 text-xs font-mono text-slate-400">#{prod.id?.slice(-5) || "---"}</td>

                    {/* MINIATURA DE IMAGEN */}
                    <td className="p-4">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* NOMBRE Y DESCRIPCIÓN */}
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
                          className="p-2 text-slate-400 hover:text-brand hover:bg-slate-100 rounded-lg transition-all">
                          <span className="material-symbols-outlined text-lg cursor-pointer">edit</span>
                        </button>
                        <button
                          onClick={() => setProductToDelete(prod)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <span className="material-symbols-outlined text-lg cursor-pointer">delete</span>
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
                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded- bg-white text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-brand transition-all"
              >
                <span className="material-symbols-outlined text-xl cursor-pointer">chevron_left</span>
              </button>

              {/* Números */}
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer text-xs font-bold transition-all ${currentPage === i + 1
                      ? 'bg-brand text-white shadow-md scale-110 z-10'
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
                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-white text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-brand transition-all"
              >
                <span className="material-symbols-outlined text-xl cursor-pointer">chevron_right</span>
              </button>
            </div>

            {/* Contador */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredAdminProducts.length)} de {filteredAdminProducts.length} productos
            </p>
          </div>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={(productData) => {
          onAddProduct(productData);
          showToast("Producto registrado con éxito");
        }}
      />

      <EditProductModal
        isOpen={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdateProduct={(id, data) => {
          onUpdateProduct(id, data);
          showToast("Cambios guardados con éxito");
        }}
      />

      <DeleteProductModal
        product={productToDelete}
        onClose={() => setProductToDelete(null)}
        onDelete={(id) => {
          onDeleteProduct(id);
          setProductToDelete(null);
          showToast("Producto eliminado con éxito", "success");
        }}
      />

      {/* NOTIFICACIÓN FLOTANTE (TOAST) */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-4 min-w-[280px]">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sistema</p>
              <p className="text-sm font-semibold text-slate-700">{toast.message}</p>
            </div>
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