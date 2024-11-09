# backend-fastapi/main.py
from fastapi import FastAPI
from auth import auth_router
from events import event_router
from database import Base, engine

# Crea todas las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Registrar rutas
app.include_router(auth_router, prefix="/auth")
app.include_router(event_router, prefix="/events")

@app.get("/")
def root():
    return {"message": "Gestión de Eventos con FastAPI"}
