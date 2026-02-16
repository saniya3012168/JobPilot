from models.user import User
from utils.jwt_helper import create_token

class AuthService:
    @staticmethod
    def register_user(email, name, password):
        if User.objects(email=email).first():
            return None, 'Email already registered'
        
        user = User(email=email, name=name)
        user.set_password(password)
        user.save()
        
        token = create_token(str(user.id), user.email)
        
        return {
            'user': user.to_dict(),
            'token': token
        }, None
    
    @staticmethod
    def login_user(email, password):
        user = User.objects(email=email).first()
        
        if not user or not user.check_password(password):
            return None, 'Invalid email or password'
        
        token = create_token(str(user.id), user.email)
        
        return {
            'user': user.to_dict(),
            'token': token
        }, None
    
    @staticmethod
    def get_user_by_id(user_id):
        try:
            return User.objects(id=user_id).first()
        except:
            return None