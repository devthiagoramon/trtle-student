# services/user_service.py
from app.models import User, db
from typing import Optional

class UserService:

    @staticmethod
    def create_user(username: str, email: str, password: str) -> User:
        """Cria um novo usuário e salva no banco"""
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def get_user_by_id(user_id: int) -> Optional[User]:
        """Retorna um usuário pelo id"""
        return User.query.get(user_id)

    @staticmethod
    def get_user_by_email(email: str) -> Optional[User]:
        """Retorna um usuário pelo email"""
        return User.query.filter_by(email=email).first()

    @staticmethod
    def update_user(user_id: int, **kwargs) -> Optional[User]:
        """Atualiza campos do usuário"""
        user = User.query.get(user_id)
        if not user:
            return None
        for key, value in kwargs.items():
            if key == "password":
                user.set_password(value)
            elif hasattr(user, key):
                setattr(user, key, value)
        db.session.commit()
        return user

    @staticmethod
    def delete_user(user_id: int) -> bool:
        """Remove um usuário"""
        user = User.query.get(user_id)
        if not user:
            return False
        db.session.delete(user)
        db.session.commit()
        return True
