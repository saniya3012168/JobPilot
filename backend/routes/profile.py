from flask import Blueprint, jsonify

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/", methods=["GET"])
def profile():
    return jsonify({"message": "Profile endpoint"})
