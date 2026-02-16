from flask import Blueprint, request, jsonify, send_file
from models.resume import Resume
from utils.jwt_helper import token_required
from utils.file_upload import save_file, delete_file, allowed_file
from bson import ObjectId
import os
from datetime import datetime

resume_bp = Blueprint('resumes', __name__, url_prefix='/api/resumes')


# GET ALL RESUMES
@resume_bp.route('', methods=['GET'])
@token_required
def get_resumes(current_user_id):
    resumes = Resume.objects(
        user_id=ObjectId(current_user_id)
    ).order_by('-uploaded_at')

    return jsonify({
        'resumes': [resume.to_dict() for resume in resumes]
    }), 200


# GET SINGLE RESUME
@resume_bp.route('/<resume_id>', methods=['GET'])
@token_required
def get_resume(current_user_id, resume_id):
    resume = Resume.objects(
        id=ObjectId(resume_id),
        user_id=ObjectId(current_user_id)
    ).first()

    if not resume:
        return jsonify({'message': 'Resume not found'}), 404

    return jsonify({'resume': resume.to_dict()}), 200


# UPLOAD RESUME
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
        user_id=ObjectId(current_user_id),
        filename=file_info['filename'],
        original_filename=file_info['original_filename'],
        file_path=file_info['file_path'],
        file_size=file_info['file_size'],
        uploaded_at=datetime.utcnow()
    )

    resume.save()

    return jsonify({
        'resume': resume.to_dict(),
        'message': 'Resume uploaded successfully'
    }), 201


# DELETE RESUME
@resume_bp.route('/<resume_id>', methods=['DELETE'])
@token_required
def delete_resume(current_user_id, resume_id):
    resume = Resume.objects(
        id=ObjectId(resume_id),
        user_id=ObjectId(current_user_id)
    ).first()

    if not resume:
        return jsonify({'message': 'Resume not found'}), 404

    delete_file(resume.file_path)

    resume.delete()

    return jsonify({'message': 'Resume deleted successfully'}), 200


# DOWNLOAD RESUME
@resume_bp.route('/<resume_id>/download', methods=['GET'])
@token_required
def download_resume(current_user_id, resume_id):
    resume = Resume.objects(
        id=ObjectId(resume_id),
        user_id=ObjectId(current_user_id)
    ).first()

    if not resume:
        return jsonify({'message': 'Resume not found'}), 404

    if not os.path.exists(resume.file_path):
        return jsonify({'message': 'File not found'}), 404

    return send_file(
        resume.file_path,
        as_attachment=True,
        download_name=resume.original_filename
    )
