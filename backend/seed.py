from app import create_app
from models import User, Job, Resume, Interview
from datetime import datetime, timedelta, UTC
import random
import os


def seed_database():
    app = create_app()

    with app.app_context():
        print("\n" + "=" * 50)
        print("🌱 SEEDING MONGODB ATLAS DATABASE")
        print("=" * 50)

        # Clear existing data
        print("\n🗑️  Clearing existing data...")
        User.objects.delete()
        Job.objects.delete()
        Resume.objects.delete()
        Interview.objects.delete()
        print("✓ Database cleared")

        print("\n👤 Creating demo user...")
        demo_user = User(
            email="demo@jobpilot.com",
            name="Aarav Sharma",
            phone="9876543210",
            location="Bangalore, India",
            bio="Full Stack Developer passionate about scalable SaaS products",
        )
        demo_user.set_password("demo123")
        demo_user.save()
        print("✓ Demo user created")

        # Sample data
        companies = [
            "Google",
            "Amazon",
            "Microsoft",
            "Apple",
            "Tesla",
            "Adobe",
            "Netflix",
            "Flipkart",
            "TCS",
            "Infosys",
            "Accenture",
            "Wipro",
            "IBM",
            "Oracle",
            "Salesforce",
        ]

        job_titles = [
            "Senior Software Engineer",
            "Full Stack Developer",
            "Backend Engineer",
            "Frontend Developer",
            "DevOps Engineer",
            "Data Engineer",
            "Technical Lead",
            "Solution Architect",
            "Cloud Engineer",
            "Site Reliability Engineer",
        ]

        locations = [
            "Bangalore, India",
            "Hyderabad, India",
            "Pune, India",
            "Mumbai, India",
            "Remote",
            "San Francisco, USA",
            "Seattle, USA",
            "New York, USA",
        ]

        statuses = ["Applied", "Interview", "Offer", "Rejected"]
        status_weights = [0.5, 0.25, 0.1, 0.15]

        print("\n💼 Creating 20 job applications...")
        jobs = []

        for i in range(20):
            job = Job(
                user=demo_user,
                title=random.choice(job_titles),
                company=random.choice(companies),
                location=random.choice(locations),
                salary=f"${random.randint(80, 180)}K - ${random.randint(180, 250)}K",
                description="Exciting opportunity to work with cutting-edge technologies and talented team.",
                status=random.choices(statuses, weights=status_weights)[0],
                created_at=datetime.now(UTC)
                - timedelta(days=random.randint(1, 90)),
            )
            job.save()
            jobs.append(job)

        print(f"✓ Created {len(jobs)} jobs")

        print("\n🗓️  Creating 3 interviews...")
        interview_types = [
            "Phone Screen",
            "Technical Round",
            "HR Round",
            "Onsite Interview",
        ]

        for i in range(3):
            interview = Interview(
                user=demo_user,
                job=jobs[i],
                company=jobs[i].company,
                position=jobs[i].title,
                interview_date=datetime.now(UTC)
                + timedelta(days=i + 2, hours=random.randint(9, 17)),
                interview_type=random.choice(interview_types),
                location="Zoom" if i < 2 else "Office",
                notes="Prepare system design and coding questions. Review company products.",
            )
            interview.save()

        print("✓ Created 3 interviews")

        print("\n📄 Creating 2 sample resumes...")
        upload_folder = "uploads/resumes"
        os.makedirs(upload_folder, exist_ok=True)

        for i in range(2):
            filename = f"resume_{demo_user.id}_{i+1}.pdf"
            filepath = os.path.join(upload_folder, filename)

            with open(filepath, "w") as f:
                f.write("Sample Resume Content - Aarav Sharma\n")
                f.write("Full Stack Developer with 5+ years experience\n")
                f.write(f"Resume Version {i+1}\n")

            resume = Resume(
                user=demo_user,
                filename=filename,
                original_filename=f"Aarav_Sharma_Resume_v{i+1}.pdf",
                file_path=filepath,
                file_size=os.path.getsize(filepath),
                uploaded_at=datetime.now(UTC)
                - timedelta(days=15 * (i + 1)),
            )
            resume.save()

        print("✓ Created 2 resumes")

        print("\n" + "=" * 50)
        print("✅ DATABASE SEEDED SUCCESSFULLY!")
        print("=" * 50)
        print("\n📧 Demo Login Credentials:")
        print("   Email:    demo@jobpilot.com")
        print("   Password: demo123")
        print("\n📊 Data Summary:")
        print("   Jobs:       20")
        print("   Interviews: 3")
        print("   Resumes:    2")
        print("   User:       1 (demo account)")
        print("=" * 50 + "\n")


if __name__ == "__main__":
    seed_database()
