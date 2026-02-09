from flask import Blueprint, request, jsonify
from services.job_service import create_job, get_jobs

job_bp = Blueprint("jobs", __name__)

@job_bp.route("/", methods=["GET"])
def list_jobs():
    user_id = request.args.get("user_id")
    jobs = get_jobs(user_id)
    return jsonify([
        {
            "id": j.id,
            "company": j.company,
            "role": j.role,
            "status": j.status
        } for j in jobs
    ])

@job_bp.route("/", methods=["POST"])
def add_job():
    job = create_job(request.get_json())
    return jsonify({"id": job.id})
