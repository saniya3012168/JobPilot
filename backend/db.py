import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["jobpilot_db"]

users = db.users
jobs = db.jobs
applications = db.applications
