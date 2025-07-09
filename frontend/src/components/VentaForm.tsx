import React, { useState, useEffect } from 'react';
import { productosApi} from '../services/api';
import { Producto, VentaCreate } from '../types';

interface VentaFormProps {
  onSubmit: (venta: VentaCreate) => void;
  onCancel: () => void;
}

const VentaForm: React.FC<VentaFormProps> = ({ onSubmit, onCancel }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [formData, setFormData] = useState({
    cantidad: '',
    cliente_nombre: '',
    cliente_documento: '',
    cliente_email: ''
  });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await productosApi.getAll();
      setProductos(data.filter(p => p.stock > 0)); // Solo productos con stock
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  const handleProductoChange = (productoId: string) => {
    const producto = productos.find(p => p.id === parseInt(productoId));
    setSelectedProducto(producto || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProducto) {
      alert('Por favor selecciona un producto');
      return;
    }

    const cantidad = parseInt(formData.cantidad);
    if (cantidad > selectedProducto.stock) {
      alert('La cantidad excede el stock disponible');
      return;
    }

    const venta: VentaCreate = {
      producto_id: selectedProducto.id,
      cantidad: cantidad,
      precio_unitario: selectedProducto.precio,
      total: selectedProducto.precio * cantidad,
      cliente_nombre: formData.cliente_nombre || undefined,
      cliente_email: formData.cliente_email || undefined
    };

    onSubmit(venta);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrar Venta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producto *
          </label>
          <select
            name="producto_id"
            onChange={(e) => handleProductoChange(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Seleccionar producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre} - Stock: {producto.stock} - ${producto.precio}
              </option>
            ))}
          </select>
        </div>

        {selectedProducto && (
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-blue-800">Producto seleccionado:</h3>
            <p className="text-blue-700">{selectedProducto.nombre}</p>
            <p className="text-blue-700">Precio: ${selectedProducto.precio}</p>
            <p className="text-blue-700">Stock disponible: {selectedProducto.stock}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad *
          </label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
            min="1"
            max={selectedProducto?.stock || 1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Información del Cliente</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Cliente
              </label>
              <input
                type="text"
                name="cliente_nombre"
                value={formData.cliente_nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documento
              </label>
              <input
                type="text"
                name="cliente_documento"
                value={formData.cliente_documento}
                onChange={handleChange}
                placeholder="CC, CE, NIT, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="cliente_email"
              value={formData.cliente_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {selectedProducto && formData.cantidad && (
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-semibold text-green-800">Resumen de la Venta:</h3>
            <p className="text-green-700">Producto: {selectedProducto.nombre}</p>
            <p className="text-green-700">Cantidad: {formData.cantidad}</p>
            <p className="text-green-700">Precio unitario: ${selectedProducto.precio}</p>
            <p className="text-green-700 font-bold">Total: ${(selectedProducto.precio * parseInt(formData.cantidad)).toFixed(2)}</p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Registrar Venta
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VentaForm; 