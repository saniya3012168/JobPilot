from flask import Blueprint, request, jsonify
from models.interview import Interview
from models.user import User
from models.job import Job
from utils.jwt_helper import token_required
from datetime import datetime
from bson import ObjectId

interview_bp = Blueprint('interviews', __name__)

@interview_bp.route('', methods=['GET'])
@token_required
def get_interviews(current_user_id):
    user = User.objects(id=current_user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    interviews = Interview.objects(user=user).order_by('-interview_date')
    return jsonify({'interviews': [interview.to_dict() for interview in interviews]}), 200

@interview_bp.route('', methods=['POST'])
@token_required
def create_interview(current_user_id):
    user = User.objects(id=current_user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    data = request.get_json()
    
    if not data or not data.get('company') or not data.get('interview_date'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        interview_date = datetime.fromisoformat(data.get('interview_date').replace('Z', '+00:00'))
    except:
        return jsonify({'message': 'Invalid date format'}), 400
    
    job = None
    if data.get('job_id'):
        job = Job.objects(id=data.get('job_id')).first()
    
    interview = Interview(
        user=user,
        job=job,
        company=data.get('company'),
        position=data.get('position'),
        interview_type=data.get('interview_type'),
        interview_date=interview_date,
        location=data.get('location'),
        notes=data.get('notes')
    )
    interview.save()
    
    return jsonify({'interview': interview.to_dict(), 'message': 'Interview created successfully'}), 201

@interview_bp.route('/<interview_id>', methods=['PUT'])
@token_required
def update_interview(current_user_id, interview_id):
    user = User.objects(id=current_user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    data = request.get_json()
    
    interview = Interview.objects(id=interview_id, user=user).first()
    if not interview:
        return jsonify({'message': 'Interview not found'}), 404
    
    interview.company = data.get('company', interview.company)
    interview.position = data.get('position', interview.position)
    interview.interview_type = data.get('interview_type', interview.interview_type)
    interview.location = data.get('location', interview.location)
    interview.notes = data.get('notes', interview.notes)
    
    if data.get('interview_date'):
        try:
            interview.interview_date = datetime.fromisoformat(data.get('interview_date').replace('Z', '+00:00'))
        except:
            return jsonify({'message': 'Invalid date format'}), 400
    
    interview.save()
    
    return jsonify({'interview': interview.to_dict(), 'message': 'Interview updated successfully'}), 200

@interview_bp.route('/<interview_id>', methods=['DELETE'])
@token_required
def delete_interview(current_user_id, interview_id):
    user = User.objects(id=current_user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    interview = Interview.objects(id=interview_id, user=user).first()
    if not interview:
        return jsonify({'message': 'Interview not found'}), 404
    
    interview.delete()
    
    return jsonify({'message': 'Interview deleted successfully'}), 200

@interview_bp.route('/upcoming', methods=['GET'])
@token_required
def get_upcoming_interviews(current_user_id):
    user = User.objects(id=current_user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    now = datetime.utcnow()
    interviews = Interview.objects(user=user, interview_date__gte=now).order_by('interview_date')
    
    return jsonify({'interviews': [interview.to_dict() for interview in interviews]}), 200