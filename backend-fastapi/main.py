# backend-fastapi/main.py
from fastapi import FastAPI
from auth import auth_router
from events import event_router
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "*",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(auth_router, prefix="/auth")
app.include_router(event_router, prefix="/events")

@app.get("/")
def root():
    return {"message": "Gestión de Eventos con FastAPI"}
