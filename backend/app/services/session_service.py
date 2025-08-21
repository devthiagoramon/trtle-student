from app.models import Session, db
from typing import Optional, List
from datetime import datetime, timezone

class SessionService:

    @staticmethod
    def create_session(user_id: int, task_list_id: int, expected_duration_minutes: int = None) -> Session:
        session = Session(
            user_id=user_id,
            task_list_id=task_list_id,
            initial_time=datetime.now(timezone.utc),
            expected_duration_minutes=expected_duration_minutes
        )
        db.session.add(session)
        db.session.commit()
        return session

    @staticmethod
    def get_session(session_id: int) -> Optional[Session]:
        return Session.query.get(session_id)

    @staticmethod
    def get_sessions_by_user(user_id: int) -> List[Session]:
        return Session.query.filter_by(user_id=user_id).all()

    @staticmethod
    def update_session(session_id: int, **kwargs) -> Optional[Session]:
        session = Session.query.get(session_id)
        if not session:
            return None
        for key, value in kwargs.items():
            if hasattr(session, key):
                setattr(session, key, value)
        db.session.commit()
        return session

    @staticmethod
    def delete_session(session_id: int) -> bool:
        session = Session.query.get(session_id)
        if not session:
            return False
        db.session.delete(session)
        db.session.commit()
        return True
