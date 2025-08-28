# services/task_service.py
from app.models import Task, db
from typing import Optional, List

class TaskService:

    @staticmethod
    def create_task(name: str, list_id: int, status: str, priority: int, description: str = "") -> Task:
        """Cria uma nova task"""
        task = Task(
            name=name,
            list_id=list_id,
            status=status,
            priority=priority,
            description=description
        )
        db.session.add(task)
        db.session.commit()
        return task

    @staticmethod
    def get_task(task_id: int) -> Optional[Task]:
        return Task.query.get(task_id)

    @staticmethod
    def get_tasks_by_list(list_id: int) -> List[Task]:
        return Task.query.filter_by(list_id=list_id).all()

    @staticmethod
    def update_task(task_id: int, **kwargs) -> Optional[Task]:
        task = Task.query.get(task_id)
        if not task:
            return None
        for key, value in kwargs.items():
            if hasattr(task, key):
                setattr(task, key, value)
        db.session.commit()
        return task

    @staticmethod
    def delete_task(task_id: int) -> bool:
        task = Task.query.get(task_id)
        if not task:
            return False
        db.session.delete(task)
        db.session.commit()
        return True
