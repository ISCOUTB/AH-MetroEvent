from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

user = os.environ["metro"]
password = os.environ["event"]

DATABASE_URL = "mysql+pymysql://{user}:{password}@ah_metroevents_db:3306/bmetroevents"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
