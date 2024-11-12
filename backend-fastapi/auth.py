from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import User as UserModel
from database import get_db

auth_router = APIRouter()

class User(BaseModel):
    username: str
    password: str

@auth_router.post("/register")
def register(user: User, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    new_user = UserModel(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Usuario registrado exitosamente"}

@auth_router.post("/login")
def login(user: User, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == user.username, UserModel.password == user.password).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    return {"message": "Inicio de sesión exitoso", "username": db_user.username}
