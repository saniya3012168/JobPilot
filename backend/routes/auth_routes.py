from flask import Blueprint, request, jsonify
from db import users
import bcrypt
import jwt
from config import Config
from datetime import datetime, timedelta

# ✅ IMPORTANT: Blueprint name must match routes/__init__.py
auth_bp = Blueprint("auth", __name__)


# =========================================
# REGISTER
# =========================================
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Missing required fields"}), 400

    # Check if user already exists
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400

    # Hash password
    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password,
        "created_at": datetime.utcnow()
    })

    return jsonify({"message": "Registered successfully"}), 201


# =========================================
# LOGIN
# =========================================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    user = users.find_one({"email": data.get("email")})

    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    if not bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user["password"]
    ):
        return jsonify({"message": "Invalid credentials"}), 401

    # Generate JWT token
    token = jwt.encode(
        {
            "user_id": str(user["_id"]),
            "email": user["email"],
            "exp": datetime.utcnow() + timedelta(hours=24)
        },
        Config.JWT_SECRET,
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "message": "Login successful"
    }), 200
