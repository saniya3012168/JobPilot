from mongoengine import connect, disconnect
from config import Config
import sys

def init_db():
    try:
        print("🔌 Connecting to MongoDB Atlas...")
        
        # Disconnect any existing connections
        disconnect()
        
        # Connect to MongoDB Atlas
        connect(
            host=Config.MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=10000
        )
        
        print("✅ MongoDB Atlas connected successfully!")
        
    except Exception as e:
        print(f"❌ MongoDB connection failed!")
        print(f"Error: {e}")
        print("\nPlease check:")
        print("1. Your MONGODB_URI in .env file")
        print("2. Your password is correct")
        print("3. IP address is whitelisted (0.0.0.0/0)")
        sys.exit(1)

from models.user import User
from models.job import Job
from models.resume import Resume
from models.interview import Interview

__all__ = ['init_db', 'User', 'Job', 'Resume', 'Interview']