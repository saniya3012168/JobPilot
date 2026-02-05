from extensions import db

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255))
    user_id = db.Column(db.Integer)
