export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria?: string;
  imagen_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Venta {
  id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  total: number;
  fecha_venta: string;
  cliente_nombre?: string;
  cliente_documento?: string;
  cliente_email?: string;
}

export interface VentaConProducto extends Venta {
  producto: Producto;
}

export interface ProductoCreate {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria?: string;
  imagen_url?: string;
}

export interface ProductoUpdate {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  categoria?: string;
  imagen_url?: string;
}

export interface VentaCreate {
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  total: number;
  cliente_nombre?: string;
  cliente_documento?: string;
  cliente_email?: string;
}

export interface Stats {
  total_productos: number;
  total_ventas: number;
  productos_sin_stock: number;
} 