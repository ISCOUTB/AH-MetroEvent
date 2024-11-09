# backend-fastapi/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# URL de conexión usando el nombre del contenedor de MySQL (ah_metroevents_db)
DATABASE_URL = "mysql+pymysql://admin_root:admin_root@ah_metroevents_db:3306/bmetroevents"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependencia para la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
