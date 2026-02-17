from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import init_db
import os


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # ==============================
    # Initialize MongoDB
    # ==============================
    init_db()

    # ==============================
    # 🔥 CORS FIX (Allow Netlify + Local)
    # ==============================
    CORS(
        app,
        supports_credentials=True,
        resources={r"/*": {"origins": "*"}}
    )

    # ==============================
    # Create Upload Folder
    # ==============================
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # ==============================
    # Register Blueprints
    # ==============================
    from routes import register_blueprints
    register_blueprints(app)

    # ==============================
    # Root Route
    # ==============================
    @app.route("/")
    def index():
        return jsonify({
            "message": "JobPilot API is running 🚀",
            "version": "1.0.0",
            "database": "MongoDB Atlas ☁️"
        }), 200

    # ==============================
    # Health Check
    # ==============================
    @app.route("/api/health")
    def health():
        return jsonify({
            "status": "healthy",
            "database": "MongoDB Atlas"
        }), 200

    return app


# 🔥 Required for Gunicorn (Render)
app = create_app()


# Run locally
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
