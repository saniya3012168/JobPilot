from mongoengine import Document, StringField, DateTimeField, ReferenceField
from datetime import datetime

class Job(Document):
    meta = {'collection': 'jobs'}
    
    user = ReferenceField('User', required=True)
    title = StringField(required=True, max_length=120)
    company = StringField(required=True, max_length=120)
    location = StringField(max_length=100)
    salary = StringField(max_length=50)
    description = StringField()
    status = StringField(default='Applied')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'user_id': str(self.user.id),
            'title': self.title,
            'company': self.company,
            'location': self.location,
            'salary': self.salary,
            'description': self.description,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Job, self).save(*args, **kwargs)