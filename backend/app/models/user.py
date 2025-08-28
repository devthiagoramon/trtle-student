from ..extensions import db, bcrypt
from .base import BaseModel

class User(BaseModel):
    __tablename__ = 'users'
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128))



    
    # Relacionamentos
    lists = db.relationship('TaskList', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password: str):
        """Gera hash da senha com bcrypt"""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password: str) -> bool:
        """Verifica a senha com bcrypt"""
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'<User {self.username}>'
