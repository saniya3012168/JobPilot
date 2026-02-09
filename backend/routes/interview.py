from flask import Blueprint, request, jsonify
from extensions import db
from models.interview import Interview

interview_bp = Blueprint("interviews", __name__)

@interview_bp.route("/", methods=["POST"])
def add_interview():
    interview = Interview(**request.get_json())
    db.session.add(interview)
    db.session.commit()
    return jsonify({"message": "Interview saved"})
