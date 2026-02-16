import os
from dotenv import load_dotenv

# Load .env only for local development
load_dotenv()

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    MONGODB_URI = os.environ.get("MONGODB_URI")

    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", "uploads/resumes")
    MAX_CONTENT_LENGTH = int(os.environ.get("MAX_CONTENT_LENGTH", 16777216))

    ENV = os.environ.get("FLASK_ENV", "production")
