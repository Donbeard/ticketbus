import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';
import ProductoForm from '../components/ProductoForm';
import { productosApi } from '../services/api';
import { Producto, ProductoCreate, ProductoUpdate } from '../types';

const ProductosPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    loadProductos();
    // Mostrar formulario automáticamente si viene del dashboard
    if (location.state?.showForm) {
      setShowForm(true);
    }
  }, [location]);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await productosApi.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProducto = async (producto: ProductoCreate) => {
    try {
      await productosApi.create(producto);
      await loadProductos();
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Error al crear producto');
      console.error(err);
    }
  };

  const handleUpdateProducto = async (producto: ProductoUpdate) => {
    if (!editingProducto) return;
    
    try {
      await productosApi.update(editingProducto.id, producto);
      await loadProductos();
      setEditingProducto(null);
      setError(null);
    } catch (err) {
      setError('Error al actualizar producto');
      console.error(err);
    }
  };

  const handleDeleteProducto = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      await productosApi.delete(id);
      await loadProductos();
      setError(null);
    } catch (err) {
      setError('Error al eliminar producto');
      console.error(err);
    }
  };

  const handleEdit = (producto: Producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProducto(null);
  };

  const handleSubmit = (producto: ProductoCreate | ProductoUpdate) => {
    if (editingProducto) {
      handleUpdateProducto(producto as ProductoUpdate);
    } else {
      handleCreateProducto(producto as ProductoCreate);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Nuevo Producto
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-8">
          <ProductoForm
            producto={editingProducto || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {productos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos registrados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onEdit={handleEdit}
              onDelete={handleDeleteProducto}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductosPage; 