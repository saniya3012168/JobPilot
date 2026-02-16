from flask import Blueprint, request, jsonify
from models.user import User
from utils.jwt_helper import token_required
from services.analytics_service import AnalyticsService

profile_bp = Blueprint('profile', __name__, url_prefix='/api/profile')

@profile_bp.route('', methods=['GET'])
@token_required
def get_profile(current_user_id):
    user = User.objects(id=current_user_id).first()
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    return jsonify({'profile': user.to_dict()}), 200

@profile_bp.route('', methods=['PUT'])
@token_required
def update_profile(current_user_id):
    data = request.get_json()
    
    user = User.objects(id=current_user_id).first()
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    user.name = data.get('name', user.name)
    user.phone = data.get('phone', user.phone)
    user.location = data.get('location', user.location)
    user.bio = data.get('bio', user.bio)
    
    if data.get('email') and data.get('email') != user.email:
        existing_user = User.objects(email=data.get('email')).first()
        if existing_user:
            return jsonify({'message': 'Email already in use'}), 400
        user.email = data.get('email')
    
    user.save()
    
    return jsonify({'profile': user.to_dict(), 'message': 'Profile updated successfully'}), 200

@profile_bp.route('/analytics', methods=['GET'])
@token_required
def get_analytics(current_user_id):
    analytics = AnalyticsService.get_user_analytics(current_user_id)
    return jsonify({'analytics': analytics}), 200