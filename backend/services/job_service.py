from extensions import db
from models.job import Job

def create_job(data):
    job = Job(**data)
    db.session.add(job)
    db.session.commit()
    return job

def get_jobs(user_id):
    return Job.query.filter_by(user_id=user_id).all()
