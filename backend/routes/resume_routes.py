from flask import Blueprint, request, jsonify
from utils.file_upload import save_file

resume_bp = Blueprint("resumes", __name__)

@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
    file = request.files["file"]
    filename = save_file(file)
    return jsonify({"filename": filename})
