from .base import BaseModel
from ..extensions import db
class TaskList(BaseModel):
    __tablename__ = 'task_lists'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)  # Nome da lista 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.Text,nullable=False) # Descrição da Lista
    # Uma lista pode ter várias tasks
    tasks = db.relationship(
        'Task',
        backref='task_list',
        lazy=True,
        cascade='all, delete-orphan'
    )
