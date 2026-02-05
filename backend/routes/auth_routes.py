from flask import Blueprint, request, jsonify
from models.user import User
from services.auth_service import register_user, login_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    user = register_user(data["email"], data["password"])
    return jsonify({"id": user.id})

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"token": login_user(user)})
