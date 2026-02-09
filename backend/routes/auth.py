from flask import Blueprint, request, jsonify
from db import users
import bcrypt, jwt
from config import Config
from datetime import datetime, timedelta

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User exists"}), 400

    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())
    users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hashed
    })
    return jsonify({"message": "Registered successfully"})

@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"email": data["email"]})

    if user and bcrypt.checkpw(data["password"].encode(), user["password"]):
        token = jwt.encode({
            "email": user["email"],
            "exp": datetime.utcnow() + timedelta(hours=24)
        }, Config.JWT_SECRET, algorithm="HS256")

        return jsonify({"token": token})

    return jsonify({"message": "Invalid credentials"}), 401
