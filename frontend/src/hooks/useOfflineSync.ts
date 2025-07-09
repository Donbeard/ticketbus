import { useEffect } from 'react';
import { syncPendingChanges } from '../services/api';
import { offlineStorage } from '../services/offlineStorage';

export const useOfflineSync = () => {
  useEffect(() => {
    const handleOnline = async () => {
      console.log('Conexión restaurada, sincronizando cambios pendientes...');
      
      try {
        const pendingChanges = await offlineStorage.getPendingChanges();
        if (pendingChanges.length > 0) {
          await syncPendingChanges();
          console.log('Cambios sincronizados automáticamente');
        }
      } catch (error) {
        console.error('Error sincronizando automáticamente:', error);
      }
    };

    const handleOffline = () => {
      console.log('Conexión perdida, activando modo offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
}; 