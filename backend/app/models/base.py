from datetime import datetime,timezone
from ..extensions import db

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    
    def save(self):
        """Salva o objeto no banco"""
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        """Remove o objeto do banco"""
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self):
        """Converte o objeto para dicionário"""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}