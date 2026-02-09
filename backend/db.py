import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["jobpilot_db"]

users_collection = db["users"]
jobs_collection = db["jobs"]
applications_collection = db["applications"]
