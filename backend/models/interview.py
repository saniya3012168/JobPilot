from mongoengine import Document, StringField, DateTimeField, ReferenceField
from datetime import datetime

class Interview(Document):
    meta = {'collection': 'interviews'}
    
    user = ReferenceField('User', required=True)
    job = ReferenceField('Job')
    company = StringField(required=True, max_length=120)
    position = StringField(max_length=120)
    interview_type = StringField(max_length=50)
    interview_date = DateTimeField(required=True)
    location = StringField(max_length=200)
    notes = StringField()
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'user_id': str(self.user.id),
            'job_id': str(self.job.id) if self.job else None,
            'company': self.company,
            'position': self.position,
            'interview_type': self.interview_type,
            'interview_date': self.interview_date.isoformat() if self.interview_date else None,
            'location': self.location,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Interview, self).save(*args, **kwargs)