from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Esquemas para Productos
class ProductoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio: float
    stock: int = 0
    categoria: Optional[str] = None
    imagen_url: Optional[str] = None

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = None
    stock: Optional[int] = None
    categoria: Optional[str] = None
    imagen_url: Optional[str] = None

class Producto(ProductoBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Esquemas para Ventas
class VentaBase(BaseModel):
    producto_id: int
    cantidad: int
    precio_unitario: float
    total: float
    cliente_nombre: Optional[str] = None
    cliente_documento: Optional[str] = None
    cliente_email: Optional[str] = None

class VentaCreate(VentaBase):
    pass

class Venta(VentaBase):
    id: int
    fecha_venta: datetime
    
    class Config:
        from_attributes = True

# Esquemas para respuestas
class VentaConProducto(Venta):
    producto: Producto 