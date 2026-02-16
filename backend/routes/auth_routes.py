from flask import Blueprint, request, jsonify
from services.auth_service import AuthService
from utils.jwt_helper import token_required

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('name') or not data.get('password'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    result, error = AuthService.register_user(
        email=data.get('email'),
        name=data.get('name'),
        password=data.get('password')
    )
    
    if error:
        return jsonify({'message': error}), 400
    
    return jsonify(result), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
    
    result, error = AuthService.login_user(
        email=data.get('email'),
        password=data.get('password')
    )
    
    if error:
        return jsonify({'message': error}), 401
    
    return jsonify(result), 200

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_current_user(current_user_id):
    user = AuthService.get_user_by_id(current_user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    return jsonify({'user': user.to_dict()}), 200