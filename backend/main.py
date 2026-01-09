from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from database import engine
import models
from config import settings
from routers import auth, users

app = FastAPI(title=settings.PROJECT_NAME)

# Настройка CORS
origins = settings.CORS_ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
from fastapi import Request
from fastapi.responses import JSONResponse
import traceback

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    error_msg = f"Unexpected error occurred: {exc}"
    print(traceback.format_exc()) # Log full traceback to console/logs
    return JSONResponse(
        status_code=500,
        content={"detail": "Произошла внутренняя ошибка сервера. Мы уже работаем над исправлением."},
    )

# Подключение роутеров
app.include_router(auth.router)
app.include_router(users.router)

@app.on_event("startup")
def startup():
    try:
        # Создаём таблицы при запуске, если их нет
        models.Base.metadata.create_all(bind=engine)
        print("Database tables created/verified!")
        
        # Проверяем соединение
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("Database connection successful!")
    except Exception as e:
        print(f"Database startup error: {e}")
        # Не падаем - пусть сервер запустится, ошибки будут видны при запросах

@app.get("/")
def read_root():
    return {"message": "Welcome to Chimi Business CRM API"}

