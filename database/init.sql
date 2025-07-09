-- Script de inicialización de la base de datos
-- Ejecutar como usuario postgres o con permisos de superusuario

-- Crear la base de datos
CREATE DATABASE productos_db;

-- Conectar a la base de datos
\c productos_db;

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    categoria VARCHAR(50),
    imagen_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cliente_nombre VARCHAR(100),
    cliente_email VARCHAR(100)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_ventas_producto_id ON ventas(producto_id);
CREATE INDEX idx_ventas_fecha ON ventas(fecha_venta);

-- Insertar algunos productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES
('Laptop HP Pavilion', 'Laptop de 15 pulgadas con procesador Intel i5', 899.99, 10, 'Electrónicos'),
('Mouse Inalámbrico', 'Mouse óptico inalámbrico con batería recargable', 29.99, 25, 'Accesorios'),
('Teclado Mecánico', 'Teclado mecánico RGB con switches Cherry MX', 89.99, 15, 'Accesorios'),
('Monitor 24"', 'Monitor LED de 24 pulgadas Full HD', 199.99, 8, 'Electrónicos'),
('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 79.99, 20, 'Audio');

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_productos_updated_at 
    BEFORE UPDATE ON productos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Crear vista para estadísticas
CREATE OR REPLACE VIEW stats_view AS
SELECT 
    COUNT(*) as total_productos,
    (SELECT COUNT(*) FROM ventas) as total_ventas,
    COUNT(CASE WHEN stock = 0 THEN 1 END) as productos_sin_stock
FROM productos;

-- Dar permisos a un usuario específico (opcional)
-- CREATE USER productos_user WITH PASSWORD 'tu_password';
-- GRANT ALL PRIVILEGES ON DATABASE productos_db TO productos_user;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO productos_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO productos_user; 