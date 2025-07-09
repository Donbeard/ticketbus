from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database import engine, get_db

# Crear tablas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Productos y Ventas",
    description="API para gestión de productos y ventas",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes para desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API de Productos y Ventas"}

# Rutas para Productos
@app.post("/productos/", response_model=schemas.Producto)
def create_producto(producto: schemas.ProductoCreate, db: Session = Depends(get_db)):
    return crud.create_producto(db=db, producto=producto)

@app.get("/productos/", response_model=List[schemas.Producto])
def read_productos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    productos = crud.get_productos(db, skip=skip, limit=limit)
    return productos

@app.get("/productos/{producto_id}", response_model=schemas.Producto)
def read_producto(producto_id: int, db: Session = Depends(get_db)):
    db_producto = crud.get_producto(db, producto_id=producto_id)
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

@app.put("/productos/{producto_id}", response_model=schemas.Producto)
def update_producto(producto_id: int, producto: schemas.ProductoUpdate, db: Session = Depends(get_db)):
    db_producto = crud.update_producto(db, producto_id, producto)
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

@app.delete("/productos/{producto_id}")
def delete_producto(producto_id: int, db: Session = Depends(get_db)):
    success = crud.delete_producto(db, producto_id)
    if not success:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"message": "Producto eliminado"}

# Rutas para Ventas
@app.post("/ventas/", response_model=schemas.Venta)
def create_venta(venta: schemas.VentaCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_venta(db=db, venta=venta)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/ventas/", response_model=List[schemas.Venta])
def read_ventas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ventas = crud.get_ventas(db, skip=skip, limit=limit)
    return ventas

@app.get("/ventas/{venta_id}", response_model=schemas.Venta)
def read_venta(venta_id: int, db: Session = Depends(get_db)):
    db_venta = crud.get_venta(db, venta_id=venta_id)
    if db_venta is None:
        raise HTTPException(status_code=404, detail="Venta no encontrada")
    return db_venta

@app.get("/ventas/producto/{producto_id}", response_model=List[schemas.Venta])
def read_ventas_por_producto(producto_id: int, db: Session = Depends(get_db)):
    ventas = crud.get_ventas_por_producto(db, producto_id)
    return ventas

# Rutas adicionales
@app.get("/productos/categoria/{categoria}")
def read_productos_por_categoria(categoria: str, db: Session = Depends(get_db)):
    productos = db.query(models.Producto).filter(models.Producto.categoria == categoria).all()
    return productos

@app.get("/stats/")
def get_stats(db: Session = Depends(get_db)):
    total_productos = db.query(models.Producto).count()
    total_ventas = db.query(models.Venta).count()
    productos_sin_stock = db.query(models.Producto).filter(models.Producto.stock == 0).count()
    
    return {
        "total_productos": total_productos,
        "total_ventas": total_ventas,
        "productos_sin_stock": productos_sin_stock
    } 