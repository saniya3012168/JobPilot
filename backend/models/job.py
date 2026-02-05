from extensions import db
from datetime import datetime

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(150), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    applied_on = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, nullable=False)
