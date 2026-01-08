from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
import os
from dotenv import load_dotenv
from pathlib import Path

# Определяем путь к .env файлу
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

# Используем NullPool - создаёт новое соединение для каждого запроса
# Это более надёжно для удалённых серверов с ограничениями
engine = create_engine(
    DATABASE_URL,
    poolclass=NullPool,  # Без пула - новое соединение каждый раз
    connect_args={
        "connect_timeout": 30,
        "read_timeout": 60,
        "write_timeout": 60,
        "charset": "utf8mb4"
    }
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


