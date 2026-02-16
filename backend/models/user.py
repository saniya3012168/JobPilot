from mongoengine import Document, StringField, DateTimeField, EmailField
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    meta = {'collection': 'users'}
    
    email = EmailField(required=True, unique=True)
    name = StringField(required=True, max_length=120)
    password_hash = StringField(required=True)
    phone = StringField(max_length=20)
    location = StringField(max_length=100)
    bio = StringField()
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'name': self.name,
            'phone': self.phone,
            'location': self.location,
            'bio': self.bio,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(User, self).save(*args, **kwargs)