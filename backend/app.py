from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)

    # ✅ HOME PAGE (FIX)
    @app.route("/", methods=["GET"])
    def home():
        return {
            "message": "JobPilot Backend is running",
            "status": "success"
        }

    # Register blueprints
    from routes.auth_routes import auth_bp
    from routes.job_routes import job_bp
    from routes.resume_routes import resume_bp
    from routes.interview_routes import interview_bp
    from routes.profile_routes import profile_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(job_bp, url_prefix="/api/jobs")
    app.register_blueprint(resume_bp, url_prefix="/api/resumes")
    app.register_blueprint(interview_bp, url_prefix="/api/interviews")
    app.register_blueprint(profile_bp, url_prefix="/api/profile")

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    print("🚀 JobPilot backend running...")
    app.run(debug=True)
