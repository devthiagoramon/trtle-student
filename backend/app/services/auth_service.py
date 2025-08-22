from flask_jwt_extended import create_access_token
from ..extensions import db
from ..models.user import User
from typing import Optional


class AuthService:

    @staticmethod
    def register(username: str, email: str, password: str) -> dict:
        # Verifica se já existe usuário com o mesmo email
        if User.query.filter_by(email=email).first():
            raise ValueError("Email já cadastrado")

        # Cria usuário
        user = User(username=username, email=email)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        # Cria token JWT
        access_token = create_access_token(identity=user.id)

        return {
            "access_token": access_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }

    @staticmethod
    def login(email: str, password: str) -> Optional[dict]:
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return {
                "access_token": access_token,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            }
        return None

    @staticmethod
    def get_profile(user_id: int) -> dict:
        user = User.query.get_or_404(user_id)
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
