import React, { useState, useEffect } from 'react';
import { offlineStorage } from '../services/offlineStorage';
import { syncPendingChanges } from '../services/api';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
  onSync?: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ onSync }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<string>('');
  const [pendingChanges, setPendingChanges] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    const loadStatus = async () => {
      const lastSyncTime = await offlineStorage.getLastSync();
      const pending = await offlineStorage.getPendingChanges();
      setLastSync(lastSyncTime);
      setPendingChanges(pending.length);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    loadStatus();

    // Verificar estado cada 30 segundos
    const interval = setInterval(loadStatus, 30000);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(interval);
    };
  }, []);

  const handleSync = async () => {
    if (!isOnline) {
      alert('No hay conexión a internet. Los cambios se sincronizarán cuando vuelva la conexión.');
      return;
    }

    setIsSyncing(true);
    try {
      await syncPendingChanges();
      const lastSyncTime = await offlineStorage.getLastSync();
      const pending = await offlineStorage.getPendingChanges();
      setLastSync(lastSyncTime);
      setPendingChanges(pending.length);
      
      if (onSync) {
        onSync();
      }
      
      alert('Datos sincronizados exitosamente');
    } catch (error) {
      console.error('Error sincronizando:', error);
      alert('Error sincronizando datos');
    } finally {
      setIsSyncing(false);
    }
  };

  const formatLastSync = (timestamp: string) => {
    if (!timestamp) return 'Nunca';
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES');
  };

  return (
    <div className="connection-status" style={{
      background: isOnline ? '#4CAF50' : '#f44336',
      color: 'white',
      padding: isExpanded ? '8px 12px' : '8px',
      borderRadius: '4px',
      fontSize: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      minWidth: isExpanded ? '200px' : 'auto',
      cursor: 'pointer'
    }}
    onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isOnline ? '#fff' : '#ffcdd2'
        }} />
        <span>{isOnline ? 'En línea' : 'Sin conexión'}</span>
        {pendingChanges > 0 && (
          <span style={{ 
            background: '#fff', 
            color: '#333', 
            borderRadius: '50%', 
            width: '16px', 
            height: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '10px'
          }}>
            {pendingChanges}
          </span>
        )}
      </div>
      
      {isExpanded && (
        <>
          {!isOnline && (
            <div style={{ marginTop: '4px', fontSize: '10px' }}>
              Modo offline activo
            </div>
          )}
          
          {pendingChanges > 0 && (
            <div style={{ marginTop: '4px', fontSize: '10px' }}>
              {pendingChanges} cambios pendientes
            </div>
          )}
          
          <div style={{ marginTop: '4px', fontSize: '10px' }}>
            Última sincronización: {formatLastSync(lastSync)}
          </div>
          
          {pendingChanges > 0 && isOnline && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSync();
              }}
              disabled={isSyncing}
              style={{
                marginTop: '8px',
                background: '#fff',
                color: '#333',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '3px',
                fontSize: '10px',
                cursor: isSyncing ? 'not-allowed' : 'pointer',
                width: '100%'
              }}
            >
              {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectionStatus; 