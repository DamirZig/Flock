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
    # In .env, this can be a comma-separated string: "http://localhost:5173,https://myapp.com"
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

    def __init__(self, **values):
        super().__init__(**values)
        self._check_security()

    def _check_security(self):
        if self.ENVIRONMENT.lower() == "production":
            if self.SECRET_KEY == "your-secret-key-change-it":
                print("WARNING: You are using the default SECRET_KEY in production! Please change it in your .env file.")
            
            # Simple check to enforce strong keys could go here
            if len(self.SECRET_KEY) < 32:
                print("WARNING: Your SECRET_KEY seems short. Consider using a stronger key (e.g. `openssl rand -hex 32`).")

    class Config:
        env_file = ".env"
        case_sensitive = True
        # Allow parsing comma-separated strings for list fields (like CORS_ORIGINS)
        @classmethod 
        def parse_env_var(cls, field_name: str, raw_val: str) -> any:
            if field_name == "CORS_ORIGINS":
                return [origin.strip() for origin in raw_val.split(",")]
            return cls.json_loads(raw_val)

settings = Settings()
