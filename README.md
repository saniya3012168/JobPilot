# JobPilot - Job Application Tracking System

A full-stack web application to track and manage job applications, interviews, and resumes.

## Tech Stack

### Backend
- Python 3.10+
- Flask
- SQLAlchemy
- SQLite
- JWT Authentication
- Flask-CORS

### Frontend
- React 18
- React Router v6
- Context API
- Axios
- Responsive CSS

## Features

- 🔐 User Authentication (Register/Login with JWT)
- 💼 Job Application Tracking (CRUD operations)
- 📄 Resume Management (Upload & Download)
- 🗓️ Interview Scheduling
- 📊 Analytics Dashboard
- 👤 Profile Management
- 📈 Application Statistics

## Installation & Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create uploads directory:
```bash
mkdir -p uploads/resumes
```

5. Run the application:
```bash
python app.py
```

Backend will run on: http://localhost:5000

6. Seed demo data (IMPORTANT):
```bash
python seed.py
```

This will create a demo user:
- Email: demo@jobpilot.com
- Username: demo
- Password: demo123

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will run on: http://localhost:3000

## Demo Login

After running `python seed.py`, use these credentials:

- **Username:** demo
- **Password:** demo123

The demo account includes:
- 15 sample job applications
- 3 scheduled interviews
- Analytics data

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Jobs
- GET `/api/jobs` - Get all jobs
- GET `/api/jobs/:id` - Get single job
- POST `/api/jobs` - Create new job
- PUT `/api/jobs/:id` - Update job
- DELETE `/api/jobs/:id` - Delete job

### Resumes
- GET `/api/resumes` - Get all resumes
- POST `/api/resumes` - Upload resume
- DELETE `/api/resumes/:id` - Delete resume
- GET `/api/resumes/:id/download` - Download resume

### Interviews
- GET `/api/interviews` - Get all interviews
- GET `/api/interviews/upcoming` - Get upcoming interviews
- POST `/api/interviews` - Create interview
- PUT `/api/interviews/:id` - Update interview
- DELETE `/api/interviews/:id` - Delete interview

### Profile
- GET `/api/profile` - Get user profile
- PUT `/api/profile` - Update profile
- GET `/api/profile/analytics` - Get analytics

## Project Structure
```
jobpilot/
├── backend/
│   ├── app.py              # Flask application
│   ├── config.py           # Configuration
│   ├── seed.py             # Demo data seeder
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Helper functions
│
└── frontend/
    ├── public/
    └── src/
        ├── components/     # Reusable components
        ├── pages/          # Page components
        ├── services/       # API services
        ├── context/        # React context
        └── styles/         # CSS styles
```

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Seed script creates demo data
- [ ] Frontend starts without errors
- [ ] Can login with demo credentials
- [ ] Dashboard shows statistics
- [ ] Can create/edit/delete jobs
- [ ] Can upload/download resumes
- [ ] Can schedule/edit interviews
- [ ] Analytics page shows charts
- [ ] Profile page updates successfully

## License

MIT License

## Author

Full Stack Engineer
```

===== LICENSE =====
```
MIT License

Copyright (c) 2024 JobPilot

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.