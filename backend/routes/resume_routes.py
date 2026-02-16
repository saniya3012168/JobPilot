from flask import Blueprint, request, jsonify, send_file

from models.resume import Resume
from utils.jwt_helper import token_required
from utils.file_upload import save_file, delete_file, allowed_file
import os

resume_bp = Blueprint('resumes', __name__)

@resume_bp.route('', methods=['GET'])
@token_required
def get_resumes(current_user_id):
    resumes = Resume.query.filter_by(user_id=current_user_id).order_by(Resume.uploaded_at.desc()).all()
    return jsonify({'resumes': [resume.to_dict() for resume in resumes]}), 200

@resume_bp.route('/<int:resume_id>', methods=['GET'])
@token_required
def get_resume(current_user_id, resume_id):
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()
    
    if not resume:
        return jsonify({'message': 'Resume not found'}), 404
    
    return jsonify({'resume': resume.to_dict()}), 200

@resume_bp.route('', methods=['POST'])
@token_required
def upload_resume(current_user_id):
    if 'file' not in request.files:
        return jsonify({'message': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'message': 'File type not allowed'}), 400
    
    file_info = save_file(file, current_user_id)
    
    if not file_info:
        return jsonify({'message': 'Error uploading file'}), 500
    
    resume = Resume(
        user_id=current_user_id,
        filename=file_info['filename'],
        original_filename=file_info['original_filename'],
        file_path=file_info['file_path'],
        file_size=file_info['file_size']
    )
    
    db.session.add(resume)
    db.session.commit()
    
    return jsonify({'resume': resume.to_dict(), 'message': 'Resume uploaded successfully'}), 201

@resume_bp.route('/<int:resume_id>', methods=['DELETE'])
@token_required
def delete_resume(current_user_id, resume_id):
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()
    
    if not resume:
        return jsonify({'message': 'Resume not found'}), 404
    
    delete_file(resume.file_path)
    
    db.session.delete(resume)
    db.session.commit()
    
    return jsonify({'message': 'Resume deleted successfully'}), 200

@resume_bp.route('/<int:resume_id>/download', methods=['GET'])
@token_required
def download_resume(current_user_id, resume_id):
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()
    
    if not resume:
        return jsonify({'message': 'Resume not found'}), 404
    
    if not os.path.exists(resume.file_path):
        return jsonify({'message': 'File not found'}), 404
    
    return send_file(resume.file_path, as_attachment=True, download_name=resume.original_filename)