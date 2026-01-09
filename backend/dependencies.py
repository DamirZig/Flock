from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from database import get_db
import crud, auth, schemas

# oauth2_scheme is still useful for Swagger UI but we'll manually check cookies too
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login", auto_error=False)

def get_current_user(request: Request, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Try to get token from cookie first
    token = request.cookies.get("access_token")
    
    if not token:
         # Optional: Fallback to Header for API testing if needed, or raise error
         raise credentials_exception

    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def check_role_access(user_role: str, required_role: str):
    hierarchy = {
        "user": 0,
        "curator": 1,
        "admin": 2,
        "owner": 3
    }
    if hierarchy.get(user_role, 0) < hierarchy.get(required_role, 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user doesn't have enough privileges"
        )

def get_current_curator(current_user: schemas.User = Depends(get_current_active_user)):
    check_role_access(current_user.role, "curator")
    return current_user

def get_current_admin_user(current_user: schemas.User = Depends(get_current_active_user)):
    check_role_access(current_user.role, "admin")
    return current_user

def get_current_owner(current_user: schemas.User = Depends(get_current_active_user)):
    check_role_access(current_user.role, "owner")
    return current_user
