from flask import Blueprint, request, jsonify

from models.user import User
from utils.jwt_helper import token_required
from services.analytics_service import AnalyticsService

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('', methods=['GET'])
@token_required
def get_profile(current_user_id):
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    return jsonify({'profile': user.to_dict()}), 200

@profile_bp.route('', methods=['PUT'])
@token_required
def update_profile(current_user_id):
    data = request.get_json()
    
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.location = data.get('location', user.location)
    user.bio = data.get('bio', user.bio)
    
    # Check if email is being changed and if it's already taken
    if data.get('email') and data.get('email') != user.email:
        existing_user = User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return jsonify({'message': 'Email already in use'}), 400
    
    db.session.commit()
    
    return jsonify({'profile': user.to_dict(), 'message': 'Profile updated successfully'}), 200

@profile_bp.route('/analytics', methods=['GET'])
@token_required
def get_analytics(current_user_id):
    analytics = AnalyticsService.get_user_analytics(current_user_id)
    return jsonify({'analytics': analytics}), 200