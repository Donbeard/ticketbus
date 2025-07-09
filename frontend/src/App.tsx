import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductosPage from './pages/ProductosPage';
import VentasPage from './pages/VentasPage';
import DashboardPage from './pages/DashboardPage';
import ConnectionStatus from './components/ConnectionStatus';
import MobileMenu from './components/MobileMenu';
import { useOfflineSync } from './hooks/useOfflineSync';

const App: React.FC = () => {
  // Usar el hook para sincronización automática
  useOfflineSync();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Connection Status */}
        <ConnectionStatus />
        
        {/* Header */}
        <header className="bg-white shadow-sm relative">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                App de Productos
              </h1>
              
              {/* Menú de escritorio */}
              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/productos"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Productos
                </Link>
                <Link
                  to="/ventas"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Ventas
                </Link>
              </nav>
              
              {/* Menú móvil */}
              <MobileMenu />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/ventas" element={<VentasPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 