from extensions import db
from models.user import User
from utils.jwt_helper import generate_token

def register_user(email, password):
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user

def login_user(user):
    return generate_token(user.id)
