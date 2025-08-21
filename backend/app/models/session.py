from datetime import datetime,timezone
class Session(BaseModel):
    __tablename__ = 'sessions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    initial_time = db.Column(db.TIMESTAMP(timezone=True),defalut=lambda:datetime.now(timezone.utc))
    end_time = db.Column(db.TIMESTAMP(timezone=True),defalut=lambda:datetime.now(timezone.utc))
    list_task_id = db.relationship(
        'Session',
        backref='task_list',
        lazy=True,
        cascade='all, delete-orphan'
    )
    expected_duration = db.Column(db.TIMESTAMP(timezone=True),defalut=lambda:datetime.now(timezone.utc))

