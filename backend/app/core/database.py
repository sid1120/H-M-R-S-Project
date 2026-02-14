from sqlalchemy import create_engine, pool
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")


if not all([DB_USER, DB_PASSWORD, DB_HOST, DB_NAME]):
    raise ValueError("Missing required database environment variables")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"


engine = create_engine(
    DATABASE_URL,
    echo=False,  
    pool_pre_ping=True,  
    pool_size=5,
    max_overflow=10,
    pool_recycle=3600  
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    pass

# Optional: Dependency for FastAPI/Flask
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()