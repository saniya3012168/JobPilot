from extensions import db
from models.job import Job

def get_status_counts(user_id):
    result = (
        db.session.query(Job.status, db.func.count())
        .filter_by(user_id=user_id)
        .group_by(Job.status)
        .all()
    )
    return dict(result)
