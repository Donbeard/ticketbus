-- Script de migración para agregar campo cliente_documento
-- Ejecutar en la base de datos productos_db

-- Agregar columna cliente_documento a la tabla ventas
ALTER TABLE ventas ADD COLUMN IF NOT EXISTS cliente_documento VARCHAR(20);

-- Verificar que la columna se agregó correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ventas' AND column_name = 'cliente_documento'; 