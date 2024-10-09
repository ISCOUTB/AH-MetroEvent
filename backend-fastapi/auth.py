from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

auth_router = APIRouter()

# Modelo de datos 
class User(BaseModel):
    username: str
    password: str

# Almacenamiento temporal de usuarios
users_db = {}

@auth_router.post("/register")
def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    users_db[user.username] = user.password
    return {"message": "Usuario registrado exitosamente"}

@auth_router.post("/login")
def login(user: User):
    if user.username not in users_db or users_db[user.username] != user.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    return {"message": "Inicio de sesión exitoso", "username": user.username}
