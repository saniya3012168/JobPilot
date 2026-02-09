import jwt
from flask import request, jsonify
from config import Config

def token_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token missing"}), 401

        try:
            jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        except:
            return jsonify({"message": "Invalid token"}), 401

        return f(*args, **kwargs)
    return wrapper
