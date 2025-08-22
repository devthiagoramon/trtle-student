# services/tasklist_service.py
from app.models import TaskList, db
from typing import Optional, List

class TaskListService:

    @staticmethod
    def create_tasklist(title: str, user_id: int, description: str) -> TaskList:
        """Cria uma nova TaskList"""
        tasklist = TaskList(title=title, user_id=user_id, description=description)
        db.session.add(tasklist)
        db.session.commit()
        return tasklist

    @staticmethod
    def get_tasklist(tasklist_id: int) -> Optional[TaskList]:
        return TaskList.query.get(tasklist_id)

    @staticmethod
    def get_tasklists_by_user(user_id: int) -> List[TaskList]:
        return TaskList.query.filter_by(user_id=user_id).all()

    @staticmethod
    def update_tasklist(tasklist_id: int, **kwargs) -> Optional[TaskList]:
        tasklist = TaskList.query.get(tasklist_id)
        if not tasklist:
            return None
        for key, value in kwargs.items():
            if hasattr(tasklist, key):
                setattr(tasklist, key, value)
        db.session.commit()
        return tasklist

    @staticmethod
    def delete_tasklist(tasklist_id: int) -> bool:
        tasklist = TaskList.query.get(tasklist_id)
        if not tasklist:
            return False
        db.session.delete(tasklist)
        db.session.commit()
        return True
