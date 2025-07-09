from sqlalchemy.orm import Session
from sqlalchemy import and_
from models import Producto, Venta
from schemas import ProductoCreate, ProductoUpdate, VentaCreate
from typing import List, Optional

# Operaciones CRUD para Productos
def get_producto(db: Session, producto_id: int):
    return db.query(Producto).filter(Producto.id == producto_id).first()

def get_productos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Producto).offset(skip).limit(limit).all()

def create_producto(db: Session, producto: ProductoCreate):
    db_producto = Producto(**producto.dict())
    db.add(db_producto)
    db.commit()
    db.refresh(db_producto)
    return db_producto

def update_producto(db: Session, producto_id: int, producto: ProductoUpdate):
    db_producto = get_producto(db, producto_id)
    if db_producto:
        update_data = producto.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_producto, field, value)
        db.commit()
        db.refresh(db_producto)
    return db_producto

def delete_producto(db: Session, producto_id: int):
    db_producto = get_producto(db, producto_id)
    if db_producto:
        db.delete(db_producto)
        db.commit()
        return True
    return False

# Operaciones CRUD para Ventas
def get_venta(db: Session, venta_id: int):
    return db.query(Venta).filter(Venta.id == venta_id).first()

def get_ventas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Venta).offset(skip).limit(limit).all()

def create_venta(db: Session, venta: VentaCreate):
    # Verificar stock disponible
    producto = get_producto(db, venta.producto_id)
    if not producto or producto.stock < venta.cantidad:
        raise ValueError("Stock insuficiente")
    
    # Crear la venta
    db_venta = Venta(**venta.dict())
    db.add(db_venta)
    
    # Actualizar stock
    producto.stock -= venta.cantidad
    
    db.commit()
    db.refresh(db_venta)
    return db_venta

def get_ventas_por_producto(db: Session, producto_id: int):
    return db.query(Venta).filter(Venta.producto_id == producto_id).all()

def get_ventas_por_fecha(db: Session, fecha_inicio: str, fecha_fin: str):
    return db.query(Venta).filter(
        and_(
            Venta.fecha_venta >= fecha_inicio,
            Venta.fecha_venta <= fecha_fin
        )
    ).all() 