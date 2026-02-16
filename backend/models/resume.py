from mongoengine import Document, StringField, IntField, DateTimeField, ReferenceField
from datetime import datetime

class Resume(Document):
    meta = {'collection': 'resumes'}
    
    user = ReferenceField('User', required=True)
    filename = StringField(required=True, max_length=255)
    original_filename = StringField(required=True, max_length=255)
    file_path = StringField(required=True, max_length=255)
    file_size = IntField()
    uploaded_at = DateTimeField(default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'user_id': str(self.user.id),
            'filename': self.filename,
            'original_filename': self.original_filename,
            'file_path': self.file_path,
            'file_size': self.file_size,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }