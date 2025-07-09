import axios from 'axios';
import { Producto, Venta, ProductoCreate, ProductoUpdate, VentaCreate, Stats } from '../types';
import { offlineStorage } from './offlineStorage';

const API_BASE_URL = 'http://192.168.20.92:8001/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para verificar conexión
const isOnline = (): boolean => {
  return navigator.onLine;
};

// Función para manejar errores de red
const handleNetworkError = async (operation: string, fallback: () => Promise<any>) => {
  if (!isOnline()) {
    console.log('Sin conexión, usando datos offline');
    return await fallback();
  }
  throw new Error('Error de red');
};

// Productos
export const productosApi = {
  getAll: async (): Promise<Producto[]> => {
    try {
      if (!isOnline()) {
        console.log('Sin conexión, cargando productos desde almacenamiento local');
        return await offlineStorage.getProductos();
      }
      
      const response = await api.get('/productos/');
      const productos = response.data;
      
      // Guardar en almacenamiento local
      await offlineStorage.saveProductos(productos);
      
      return productos;
    } catch (error) {
      console.log('Error obteniendo productos, usando datos offline:', error);
      return await offlineStorage.getProductos();
    }
  },

  getById: async (id: number): Promise<Producto> => {
    try {
      if (!isOnline()) {
        const productos = await offlineStorage.getProductos();
        const producto = productos.find(p => p.id === id);
        if (!producto) throw new Error('Producto no encontrado');
        return producto;
      }
      
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error obteniendo producto, usando datos offline:', error);
      const productos = await offlineStorage.getProductos();
      const producto = productos.find(p => p.id === id);
      if (!producto) throw new Error('Producto no encontrado');
      return producto;
    }
  },

  create: async (producto: ProductoCreate): Promise<Producto> => {
    try {
      if (!isOnline()) {
        // Crear producto localmente
        const productos = await offlineStorage.getProductos();
        const newProducto = {
          ...producto,
          id: Date.now(), // ID temporal
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        productos.push(newProducto);
        await offlineStorage.saveProductos(productos);
        
        // Agregar a cambios pendientes
        await offlineStorage.addPendingChange({
          type: 'CREATE_PRODUCTO',
          data: producto
        });
        
        return newProducto;
      }
      
      const response = await api.post('/productos/', producto);
      const newProducto = response.data;
      
      // Actualizar almacenamiento local
      const productos = await offlineStorage.getProductos();
      productos.push(newProducto);
      await offlineStorage.saveProductos(productos);
      
      return newProducto;
    } catch (error) {
      console.log('Error creando producto, guardando localmente:', error);
      // Crear localmente como fallback
      const productos = await offlineStorage.getProductos();
      const newProducto = {
        ...producto,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      productos.push(newProducto);
      await offlineStorage.saveProductos(productos);
      
      await offlineStorage.addPendingChange({
        type: 'CREATE_PRODUCTO',
        data: producto
      });
      
      return newProducto;
    }
  },

  update: async (id: number, producto: ProductoUpdate): Promise<Producto> => {
    try {
      if (!isOnline()) {
        const productos = await offlineStorage.getProductos();
        const index = productos.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Producto no encontrado');
        
        productos[index] = { ...productos[index], ...producto, updated_at: new Date().toISOString() };
        await offlineStorage.saveProductos(productos);
        
        await offlineStorage.addPendingChange({
          type: 'UPDATE_PRODUCTO',
          id,
          data: producto
        });
        
        return productos[index];
      }
      
      const response = await api.put(`/productos/${id}`, producto);
      const updatedProducto = response.data;
      
      // Actualizar almacenamiento local
      const productos = await offlineStorage.getProductos();
      const index = productos.findIndex(p => p.id === id);
      if (index !== -1) {
        productos[index] = updatedProducto;
        await offlineStorage.saveProductos(productos);
      }
      
      return updatedProducto;
    } catch (error) {
      console.log('Error actualizando producto, guardando localmente:', error);
      const productos = await offlineStorage.getProductos();
      const index = productos.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Producto no encontrado');
      
      productos[index] = { ...productos[index], ...producto, updated_at: new Date().toISOString() };
      await offlineStorage.saveProductos(productos);
      
      await offlineStorage.addPendingChange({
        type: 'UPDATE_PRODUCTO',
        id,
        data: producto
      });
      
      return productos[index];
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      if (!isOnline()) {
        const productos = await offlineStorage.getProductos();
        const index = productos.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Producto no encontrado');
        
        productos.splice(index, 1);
        await offlineStorage.saveProductos(productos);
        
        await offlineStorage.addPendingChange({
          type: 'DELETE_PRODUCTO',
          id
        });
        
        return;
      }
      
      await api.delete(`/productos/${id}`);
      
      // Actualizar almacenamiento local
      const productos = await offlineStorage.getProductos();
      const index = productos.findIndex(p => p.id === id);
      if (index !== -1) {
        productos.splice(index, 1);
        await offlineStorage.saveProductos(productos);
      }
    } catch (error) {
      console.log('Error eliminando producto, guardando localmente:', error);
      const productos = await offlineStorage.getProductos();
      const index = productos.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Producto no encontrado');
      
      productos.splice(index, 1);
      await offlineStorage.saveProductos(productos);
      
      await offlineStorage.addPendingChange({
        type: 'DELETE_PRODUCTO',
        id
      });
    }
  },

  getByCategoria: async (categoria: string): Promise<Producto[]> => {
    try {
      if (!isOnline()) {
        const productos = await offlineStorage.getProductos();
        return productos.filter(p => p.categoria === categoria);
      }
      
      const response = await api.get(`/productos/categoria/${categoria}`);
      return response.data;
    } catch (error) {
      console.log('Error obteniendo productos por categoría, usando datos offline:', error);
      const productos = await offlineStorage.getProductos();
      return productos.filter(p => p.categoria === categoria);
    }
  },
};

// Ventas
export const ventasApi = {
  getAll: async (): Promise<Venta[]> => {
    try {
      if (!isOnline()) {
        console.log('Sin conexión, cargando ventas desde almacenamiento local');
        return await offlineStorage.getVentas();
      }
      
      const response = await api.get('/ventas/');
      const ventas = response.data;
      
      // Guardar en almacenamiento local
      await offlineStorage.saveVentas(ventas);
      
      return ventas;
    } catch (error) {
      console.log('Error obteniendo ventas, usando datos offline:', error);
      return await offlineStorage.getVentas();
    }
  },

  getById: async (id: number): Promise<Venta> => {
    try {
      if (!isOnline()) {
        const ventas = await offlineStorage.getVentas();
        const venta = ventas.find(v => v.id === id);
        if (!venta) throw new Error('Venta no encontrada');
        return venta;
      }
      
      const response = await api.get(`/ventas/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error obteniendo venta, usando datos offline:', error);
      const ventas = await offlineStorage.getVentas();
      const venta = ventas.find(v => v.id === id);
      if (!venta) throw new Error('Venta no encontrada');
      return venta;
    }
  },

  create: async (venta: VentaCreate): Promise<Venta> => {
    try {
      if (!isOnline()) {
        // Crear venta localmente
        const ventas = await offlineStorage.getVentas();
        const newVenta = {
          ...venta,
          id: Date.now(),
          fecha_venta: new Date().toISOString(),
          created_at: new Date().toISOString()
        };
        
        ventas.push(newVenta);
        await offlineStorage.saveVentas(ventas);
        
        // Agregar a cambios pendientes
        await offlineStorage.addPendingChange({
          type: 'CREATE_VENTA',
          data: venta
        });
        
        return newVenta;
      }
      
      const response = await api.post('/ventas/', venta);
      const newVenta = response.data;
      
      // Actualizar almacenamiento local
      const ventas = await offlineStorage.getVentas();
      ventas.push(newVenta);
      await offlineStorage.saveVentas(ventas);
      
      return newVenta;
    } catch (error) {
      console.log('Error creando venta, guardando localmente:', error);
      // Crear localmente como fallback
      const ventas = await offlineStorage.getVentas();
      const newVenta = {
        ...venta,
        id: Date.now(),
        fecha_venta: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      
      ventas.push(newVenta);
      await offlineStorage.saveVentas(ventas);
      
      await offlineStorage.addPendingChange({
        type: 'CREATE_VENTA',
        data: venta
      });
      
      return newVenta;
    }
  },

  getByProducto: async (productoId: number): Promise<Venta[]> => {
    try {
      if (!isOnline()) {
        const ventas = await offlineStorage.getVentas();
        return ventas.filter(v => v.producto_id === productoId);
      }
      
      const response = await api.get(`/ventas/producto/${productoId}`);
      return response.data;
    } catch (error) {
      console.log('Error obteniendo ventas por producto, usando datos offline:', error);
      const ventas = await offlineStorage.getVentas();
      return ventas.filter(v => v.producto_id === productoId);
    }
  },
};

// Estadísticas
export const statsApi = {
  getStats: async (): Promise<Stats> => {
    try {
      if (!isOnline()) {
        console.log('Sin conexión, cargando estadísticas desde almacenamiento local');
        return await offlineStorage.getStats();
      }
      
      const response = await api.get('/stats/');
      const stats = response.data;
      
      // Guardar en almacenamiento local
      await offlineStorage.saveStats(stats);
      
      return stats;
    } catch (error) {
      console.log('Error obteniendo estadísticas, usando datos offline:', error);
      return await offlineStorage.getStats();
    }
  },
};

// Función para sincronizar cambios pendientes
export const syncPendingChanges = async (): Promise<void> => {
  if (!isOnline()) {
    console.log('Sin conexión, no se pueden sincronizar cambios');
    return;
  }

  try {
    const pendingChanges = await offlineStorage.getPendingChanges();
    
    for (const change of pendingChanges) {
      try {
        switch (change.type) {
          case 'CREATE_PRODUCTO':
            await api.post('/productos/', change.data);
            break;
          case 'UPDATE_PRODUCTO':
            await api.put(`/productos/${change.id}`, change.data);
            break;
          case 'DELETE_PRODUCTO':
            await api.delete(`/productos/${change.id}`);
            break;
          case 'CREATE_VENTA':
            await api.post('/ventas/', change.data);
            break;
        }
      } catch (error) {
        console.error('Error sincronizando cambio:', change, error);
      }
    }
    
    // Limpiar cambios sincronizados
    await offlineStorage.clearPendingChanges();
    console.log('Cambios sincronizados exitosamente');
  } catch (error) {
    console.error('Error sincronizando cambios:', error);
  }
};

export default api; 