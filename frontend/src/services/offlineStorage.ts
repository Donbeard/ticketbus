// Servicio para manejo offline de datos
export interface OfflineData {
  productos: any[];
  ventas: any[];
  stats: any;
  lastSync: string;
  pendingChanges: any[];
}

class OfflineStorageService {
  private readonly STORAGE_KEY = 'base_app_offline_data';

  // Guardar datos localmente
  async saveData(data: Partial<OfflineData>): Promise<void> {
    try {
      const existingData = await this.getData();
      const updatedData = {
        ...existingData,
        ...data,
        lastSync: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error guardando datos offline:', error);
    }
  }

  // Obtener datos locales
  async getData(): Promise<OfflineData> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error leyendo datos offline:', error);
    }
    
    // Datos por defecto
    return {
      productos: [],
      ventas: [],
      stats: { total_productos: 0, total_ventas: 0, productos_sin_stock: 0 },
      lastSync: new Date().toISOString(),
      pendingChanges: []
    };
  }

  // Guardar productos
  async saveProductos(productos: any[]): Promise<void> {
    await this.saveData({ productos });
  }

  // Obtener productos
  async getProductos(): Promise<any[]> {
    const data = await this.getData();
    return data.productos || [];
  }

  // Guardar ventas
  async saveVentas(ventas: any[]): Promise<void> {
    await this.saveData({ ventas });
  }

  // Obtener ventas
  async getVentas(): Promise<any[]> {
    const data = await this.getData();
    return data.ventas || [];
  }

  // Guardar estadísticas
  async saveStats(stats: any): Promise<void> {
    await this.saveData({ stats });
  }

  // Obtener estadísticas
  async getStats(): Promise<any> {
    const data = await this.getData();
    return data.stats || { total_productos: 0, total_ventas: 0, productos_sin_stock: 0 };
  }

  // Agregar cambio pendiente
  async addPendingChange(change: any): Promise<void> {
    const data = await this.getData();
    data.pendingChanges.push({
      ...change,
      timestamp: new Date().toISOString()
    });
    await this.saveData({ pendingChanges: data.pendingChanges });
  }

  // Obtener cambios pendientes
  async getPendingChanges(): Promise<any[]> {
    const data = await this.getData();
    return data.pendingChanges || [];
  }

  // Limpiar cambios pendientes
  async clearPendingChanges(): Promise<void> {
    await this.saveData({ pendingChanges: [] });
  }

  // Verificar si hay conexión
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Obtener timestamp de última sincronización
  async getLastSync(): Promise<string> {
    const data = await this.getData();
    return data.lastSync;
  }
}

export const offlineStorage = new OfflineStorageService(); 