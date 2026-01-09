from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import schemas, auth
from dependencies import get_current_curator
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])

class AdminVerifyRequest(BaseModel):
    password: str

@router.post("/verify-password")
def verify_admin_password(
    data: AdminVerifyRequest,
    current_user: schemas.User = Depends(get_current_curator),
    db: Session = Depends(get_db)
):
    """
    Эндпоинт для перепроверки специального админ-пароля.
    Доступен всем уровням админов (куратор и выше).
    Если пароль в БД в открытом виде (не начинается с bcrypt), 
    он хешируется после первой успешной проверки.
    """
    from crud import get_user_by_email
    db_user = get_user_by_email(db, email=current_user.email)
    
    if not db_user or not db_user.admin_password_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Админ-пароль не установлен"
        )
    
    # Проверка: если это обычный текст (не хеш bcrypt)
    # bcrypt хеши обычно начинаются с $2b$ или $2a$
    is_hashed = db_user.admin_password_hash.startswith("$2b$") or db_user.admin_password_hash.startswith("$2a$")
    
    verified = False
    if is_hashed:
        verified = auth.verify_password(data.password, db_user.admin_password_hash)
    else:
        # Сравнение как открытый текст
        verified = (data.password == db_user.admin_password_hash)
        if verified:
            # Автоматическое хеширование после первой проверки
            db_user.admin_password_hash = auth.get_password_hash(data.password)
            db.commit()
            db.refresh(db_user)

    if not verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный админ-пароль"
        )
    
    return {"status": "success", "message": "Пароль подтвержден"}
