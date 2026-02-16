from flask import Blueprint, request, jsonify
from models.interview import Interview
from utils.jwt_helper import token_required
from bson import ObjectId
from datetime import datetime

interview_bp = Blueprint('interviews', __name__, url_prefix='/api/interviews')


# GET ALL INTERVIEWS
@interview_bp.route('', methods=['GET'])
@token_required
def get_interviews(current_user_id):
    interviews = Interview.objects(
        user_id=ObjectId(current_user_id)
    ).order_by('-interview_date')

    return jsonify({
        'interviews': [i.to_dict() for i in interviews]
    }), 200


# GET SINGLE INTERVIEW
@interview_bp.route('/<interview_id>', methods=['GET'])
@token_required
def get_interview(current_user_id, interview_id):
    interview = Interview.objects(
        id=ObjectId(interview_id),
        user_id=ObjectId(current_user_id)
    ).first()

    if not interview:
        return jsonify({'message': 'Interview not found'}), 404

    return jsonify({
        'interview': interview.to_dict()
    }), 200


# CREATE INTERVIEW
@interview_bp.route('', methods=['POST'])
@token_required
def create_interview(current_user_id):
    data = request.get_json()

    if not data or not data.get('company') or not data.get('interview_date'):
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        interview_date = datetime.fromisoformat(
            data.get('interview_date').replace('Z', '+00:00')
        )
    except:
        return jsonify({'message': 'Invalid date format'}), 400

    interview = Interview(
        user_id=ObjectId(current_user_id),
        job_id=data.get('job_id'),
        company=data.get('company'),
        position=data.get('position'),
        interview_type=data.get('interview_type'),
        interview_date=interview_date,
        location=data.get('location'),
        notes=data.get('notes'),
        status=data.get('status', 'Scheduled')
    )

    interview.save()

    return jsonify({
        'interview': interview.to_dict(),
        'message': 'Interview created successfully'
    }), 201


# UPDATE INTERVIEW
@interview_bp.route('/<interview_id>', methods=['PUT'])
@token_required
def update_interview(current_user_id, interview_id):
    data = request.get_json()

    interview = Interview.objects(
        id=ObjectId(interview_id),
        user_id=ObjectId(current_user_id)
    ).first()

    if not interview:
        return jsonify({'message': 'Interview not found'}), 404

    interview.company = data.get('company', interview.company)
    interview.position = data.get('position', interview.position)
    interview.interview_type = data.get('interview_type', interview.interview_type)
    interview.location = data.get('location', interview.location)
    interview.notes = data.get('notes', interview.notes)
    interview.status = data.get('status', interview.status)

    if data.get('interview_date'):
        try:
            interview.interview_date = datetime.fromisoformat(
                data.get('interview_date').replace('Z', '+00:00')
            )
        except:
            return jsonify({'message': 'Invalid date format'}), 400

    interview.save()

    return jsonify({
        'interview': interview.to_dict(),
        'message': 'Interview updated successfully'
    }), 200


# DELETE INTERVIEW
@interview_bp.route('/<interview_id>', methods=['DELETE'])
@token_required
def delete_interview(current_user_id, interview_id):
    interview = Interview.objects(
        id=ObjectId(interview_id),
        user_id=ObjectId(current_user_id)
    ).first()

    if not interview:
        return jsonify({'message': 'Interview not found'}), 404

    interview.delete()

    return jsonify({'message': 'Interview deleted successfully'}), 200


# UPCOMING INTERVIEWS
@interview_bp.route('/upcoming', methods=['GET'])
@token_required
def get_upcoming_interviews(current_user_id):
    now = datetime.utcnow()

    interviews = Interview.objects(
        user_id=ObjectId(current_user_id),
        interview_date__gte=now
    ).order_by('interview_date')

    return jsonify({
        'interviews': [i.to_dict() for i in interviews]
    }), 200
