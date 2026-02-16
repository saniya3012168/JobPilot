from models.job import Job
from models.interview import Interview
from models.user import User
from datetime import datetime, timedelta

class AnalyticsService:
    @staticmethod
    def get_user_analytics(user_id):
        user = User.objects(id=user_id).first()
        if not user:
            return {}
        
        total_jobs = Job.objects(user=user).count()
        
        status_breakdown = {}
        for status in ['Applied', 'Interview', 'Offer', 'Rejected']:
            count = Job.objects(user=user, status=status).count()
            if count > 0:
                status_breakdown[status] = count
        
        total_interviews = Interview.objects(user=user).count()
        
        now = datetime.utcnow()
        upcoming_interviews = Interview.objects(user=user, interview_date__gte=now).count()
        
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_applications = Job.objects(user=user, created_at__gte=thirty_days_ago).count()
        
        return {
            'total_jobs': total_jobs,
            'status_breakdown': status_breakdown,
            'total_interviews': total_interviews,
            'upcoming_interviews': upcoming_interviews,
            'recent_applications': recent_applications
        }