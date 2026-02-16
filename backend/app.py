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
    # CORS Configuration
    # ==============================
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:3000",
                    "https://jobpilot.netlify.app",
                    "https://*.netlify.app"
                ],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
                "supports_credentials": True,
            }
        },
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
    # Health Check Route
    # ==============================
    @app.route("/api/health")
    def health():
        return jsonify({
            "status": "healthy",
            "database": "MongoDB Atlas"
        }), 200

    return app


# ==================================
# Run Server (Local Development Only)
# ==================================
if __name__ == "__main__":
    app = create_app()

    print("=" * 50)
    print("🚀 Starting JobPilot API server...")
    print("=" * 50)
    print("📍 Server: http://localhost:5000")
    print("📍 Health: http://localhost:5000/api/health")
    print("📍 Database: MongoDB Atlas ☁️")
    print("=" * 50)

    # Render automatically provides PORT
    port = int(os.environ.get("PORT", 5000))

    # 🔥 IMPORTANT: Disable reloader on Windows to prevent WinError 10038
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False,
        use_reloader=False
    )
