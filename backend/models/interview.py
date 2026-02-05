from extensions import db

class Interview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_name = db.Column(db.String(100))
    feedback = db.Column(db.Text)
    job_id = db.Column(db.Integer)
