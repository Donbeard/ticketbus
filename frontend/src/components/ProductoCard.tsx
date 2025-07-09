import React from 'react';
import { Producto } from '../types';

interface ProductoCardProps {
  producto: Producto;
  onEdit?: (producto: Producto) => void;
  onDelete?: (id: number) => void;
  onVender?: (producto: Producto) => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ 
  producto, 
  onEdit, 
  onDelete, 
  onVender 
}) => {
  const stockColor = producto.stock > 0 ? 'text-green-600' : 'text-red-600';
  const stockText = producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{producto.nombre}</h3>
        <span className="text-2xl font-bold text-primary-600">
          ${producto.precio.toFixed(2)}
        </span>
      </div>
      
      {producto.descripcion && (
        <p className="text-gray-600 mb-4">{producto.descripcion}</p>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <span className={`font-medium ${stockColor}`}>{stockText}</span>
        {producto.categoria && (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
            {producto.categoria}
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        {onVender && producto.stock > 0 && (
          <button
            onClick={() => onVender(producto)}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Vender
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(producto)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(producto.id)}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductoCard; 