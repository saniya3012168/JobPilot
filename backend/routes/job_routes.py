from flask import Blueprint, request, jsonify
from services.job_service import JobService
from utils.jwt_helper import token_required

job_bp = Blueprint('jobs', __name__)

@job_bp.route('', methods=['GET'])
@token_required
def get_jobs(current_user_id):
    jobs = JobService.get_user_jobs(current_user_id)
    return jsonify({'jobs': [job.to_dict() for job in jobs]}), 200

@job_bp.route('/<job_id>', methods=['GET'])
@token_required
def get_job(current_user_id, job_id):
    job = JobService.get_job_by_id(job_id, current_user_id)
    
    if not job:
        return jsonify({'message': 'Job not found'}), 404
    
    return jsonify({'job': job.to_dict()}), 200

@job_bp.route('', methods=['POST'])
@token_required
def create_job(current_user_id):
    data = request.get_json()
    
    if not data or not data.get('company') or not data.get('title'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    job = JobService.create_job(current_user_id, data)
    
    return jsonify({'job': job.to_dict(), 'message': 'Job created successfully'}), 201

@job_bp.route('/<job_id>', methods=['PUT'])
@token_required
def update_job(current_user_id, job_id):
    data = request.get_json()
    
    job = JobService.update_job(job_id, current_user_id, data)
    
    if not job:
        return jsonify({'message': 'Job not found'}), 404
    
    return jsonify({'job': job.to_dict(), 'message': 'Job updated successfully'}), 200

@job_bp.route('/<job_id>', methods=['DELETE'])
@token_required
def delete_job(current_user_id, job_id):
    success = JobService.delete_job(job_id, current_user_id)
    
    if not success:
        return jsonify({'message': 'Job not found'}), 404
    
    return jsonify({'message': 'Job deleted successfully'}), 200