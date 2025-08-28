from datetime import datetime,timezone
from .base import BaseModel
from ..extensions import db


class Task(BaseModel):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(120),nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('task_lists.id'), nullable=False)
    delivery_time = db.Column(db.TIMESTAMP(timezone=True),default=lambda:datetime.now(timezone.utc))
    priority = db.Column(db.Integer,nullable=False)