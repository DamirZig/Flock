from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = "Chimi Business"
    ENVIRONMENT: str = "development" # development | production
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-it" # Override in .env
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str = "sqlite:///./sql_app.db"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
    
    @property
    def SECURE_COOKIES(self) -> bool:
        """
        Determines if cookies should be Secure (HTTPS only).
        True in production, False in development.
        """
        return self.ENVIRONMENT.lower() == "production"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
