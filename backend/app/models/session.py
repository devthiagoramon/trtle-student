from datetime import datetime, timezone
from ..extensions import db
from .base import BaseModel

class Session(BaseModel):
    __tablename__ = 'sessions'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    task_list_id = db.Column(db.Integer, db.ForeignKey('task_lists.id'), nullable=False)
    
    initial_time = db.Column(db.TIMESTAMP(timezone=True), default=lambda: datetime.now(timezone.utc))
    end_time = db.Column(db.TIMESTAMP(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    expected_duration_minutes = db.Column(db.Integer, nullable=True)  # duração em minutos

    # Relacionamentos
    user = db.relationship('User', backref='sessions', lazy=True)
    task_list = db.relationship('TaskList', backref='sessions', lazy=True)
