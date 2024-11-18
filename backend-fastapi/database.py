from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

<<<<<<< HEAD
load_dotenv()
=======
load_dotenv()

>>>>>>> afd6107 (	modificados:     backend-fastapi/.env)
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")

DATABASE_URL = f"mysql+pymysql://{user}:{password}@ah_metroevents_db:3306/bmetroevents"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
