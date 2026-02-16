from models.job import Job
from models.user import User

class JobService:
    @staticmethod
    def create_job(user_id, data):
        user = User.objects(id=user_id).first()
        if not user:
            return None
        
        job = Job(
            user=user,
            title=data.get('title'),
            company=data.get('company'),
            location=data.get('location'),
            salary=data.get('salary'),
            description=data.get('description'),
            status=data.get('status', 'Applied')
        )
        job.save()
        return job
    
    @staticmethod
    def get_user_jobs(user_id):
        user = User.objects(id=user_id).first()
        if not user:
            return []
        return Job.objects(user=user).order_by('-created_at')
    
    @staticmethod
    def get_job_by_id(job_id, user_id):
        user = User.objects(id=user_id).first()
        if not user:
            return None
        return Job.objects(id=job_id, user=user).first()
    
    @staticmethod
    def update_job(job_id, user_id, data):
        job = JobService.get_job_by_id(job_id, user_id)
        if not job:
            return None
        
        job.title = data.get('title', job.title)
        job.company = data.get('company', job.company)
        job.location = data.get('location', job.location)
        job.salary = data.get('salary', job.salary)
        job.description = data.get('description', job.description)
        job.status = data.get('status', job.status)
        job.save()
        
        return job
    
    @staticmethod
    def delete_job(job_id, user_id):
        job = JobService.get_job_by_id(job_id, user_id)
        if not job:
            return False
        job.delete()
        return True