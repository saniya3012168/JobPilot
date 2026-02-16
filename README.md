# 🚀 JobPilot - Job Application Tracker

A full-stack web application to manage and track your job applications, interviews, and resumes efficiently.

![JobPilot Banner](https://img.shields.io/badge/JobPilot-Application%20Tracker-blue)
![Python](https://img.shields.io/badge/Python-3.14-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Team Collaboration](#team-collaboration)
- [Demo Credentials](#demo-credentials)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 📊 Dashboard
- Real-time statistics overview
- Recent applications tracking
- Upcoming interviews calendar
- Application status breakdown

### 💼 Job Management
- Create, update, and delete job applications
- Track application status (Applied, Interview, Offer, Rejected)
- Filter jobs by status
- Store job details (title, company, location, salary, description)

### 🗓️ Interview Scheduling
- Schedule and manage interviews
- Track interview types (Phone, Video, Technical, Onsite)
- Add interview notes and preparation tips
- View upcoming and past interviews

### 📄 Resume Management
- Upload multiple resume versions
- Download resumes anytime
- Track file sizes and upload dates
- Support for PDF, DOC, DOCX formats

### 📈 Analytics
- Application success rate
- Interview conversion metrics
- Status distribution charts
- Recent activity tracking

### 👤 Profile Management
- Update personal information
- Manage contact details
- Edit bio and location

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Flask 3.0.0
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** MongoEngine 0.27.0
- **Authentication:** JWT (PyJWT 2.8.0)
- **Password Hashing:** Werkzeug
- **CORS:** Flask-CORS 4.0.0

### Frontend
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.20.0
- **HTTP Client:** Axios 1.6.0
- **Styling:** Custom CSS with modern design

### Development Tools
- **Version Control:** Git
- **Code Editor:** VS Code
- **Package Manager:** npm, pip
- **Environment:** Virtual Environment (venv)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.10+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/jobpilot.git
cd jobpilot
```

### 2. Backend Setup
```bash
# Navigate to backend folder
cd JobPilot/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install
```

---

## ⚙️ Configuration

### 1. MongoDB Atlas Setup

#### a. Create Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a **FREE M0 cluster**
3. Choose your preferred region

#### b. Create Database User
1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Set username and password (save these!)
4. Select: **"Read and write to any database"**

#### c. Whitelist IP Address
1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
4. Confirm

#### d. Get Connection String
1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **Python** and **3.12 or later**
4. Copy the connection string

### 2. Environment Variables

Create `.env` file in the `backend` folder:
```env
# Security Keys
SECRET_KEY=your-secret-key-change-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-in-production

# MongoDB Atlas Connection String
# Replace <username>, <password>, and <cluster-url> with your actual values
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/jobpilot?retryWrites=true&w=majority

# File Upload Settings
UPLOAD_FOLDER=uploads/resumes
MAX_CONTENT_LENGTH=16777216

# Environment
FLASK_ENV=development
```

**Example:**
```env
MONGODB_URI=mongodb+srv://jobpilot_user:MyPassword123@cluster0.abc123.mongodb.net/jobpilot?retryWrites=true&w=majority
```

### 3. Frontend Configuration (Optional)

Create `.env` file in the `frontend` folder (if needed):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the Application

### 1. Seed the Database
```bash
# In backend folder with venv activated
python seed.py
```

**Output:**
```
✅ DATABASE SEEDED SUCCESSFULLY!
📧 Demo Login: demo@jobpilot.com / demo123
📊 Data: 20 jobs, 3 interviews, 2 resumes
```

### 2. Start Backend Server
```bash
# In backend folder with venv activated
python app.py
```

**Server runs on:** `http://localhost:5000`

### 3. Start Frontend (New Terminal)
```bash
# In frontend folder
npm start
```

**App opens at:** `http://localhost:3000`

---

## 📁 Project Structure
```
jobpilot/
├── README.md
├── .gitignore
│
├── JobPilot/
│   ├── backend/
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── job.py
│   │   │   ├── resume.py
│   │   │   └── interview.py
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth_routes.py
│   │   │   ├── job_routes.py
│   │   │   ├── resume_routes.py
│   │   │   ├── interview_routes.py
│   │   │   └── profile_routes.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── job_service.py
│   │   │   └── analytics_service.py
│   │   │
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   ├── jwt_helper.py
│   │   │   └── file_upload.py
│   │   │
│   │   ├── uploads/resumes/
│   │   ├── .env
│   │   ├── .gitignore
│   │   ├── app.py
│   │   ├── config.py
│   │   ├── seed.py
│   │   └── requirements.txt
│   │
│   └── frontend/
│       ├── public/
│       │   └── index.html
│       │
│       ├── src/
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── JobCard.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   │
│       │   ├── pages/
│       │   │   ├── Landing.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Jobs.jsx
│       │   │   ├── Resume.jsx
│       │   │   ├── Interview.jsx
│       │   │   ├── Analytics.jsx
│       │   │   └── Profile.jsx
│       │   │
│       │   ├── context/
│       │   │   └── AuthContext.jsx
│       │   │
│       │   ├── services/
│       │   │   ├── api.js
│       │   │   ├── authService.js
│       │   │   └── jobService.js
│       │   │
│       │   ├── styles/
│       │   │   └── main.css
│       │   │
│       │   ├── App.js
│       │   └── index.js
│       │
│       ├── .gitignore
│       ├── package.json
│       └── package-lock.json
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
```

### Jobs
```
GET    /api/jobs             - Get all jobs
GET    /api/jobs/:id         - Get single job
POST   /api/jobs             - Create job
PUT    /api/jobs/:id         - Update job
DELETE /api/jobs/:id         - Delete job
```

### Interviews
```
GET    /api/interviews           - Get all interviews
GET    /api/interviews/upcoming  - Get upcoming interviews
POST   /api/interviews           - Create interview
PUT    /api/interviews/:id       - Update interview
DELETE /api/interviews/:id       - Delete interview
```

### Resumes
```
GET    /api/resumes              - Get all resumes
POST   /api/resumes              - Upload resume
GET    /api/resumes/:id/download - Download resume
DELETE /api/resumes/:id          - Delete resume
```

### Profile
```
GET    /api/profile          - Get user profile
PUT    /api/profile          - Update profile
GET    /api/profile/analytics - Get analytics
```

---

## 👥 Team Collaboration

### Setup for Multiple Developers

#### 1. Each Team Member Creates Database User

Each developer should have their own MongoDB Atlas credentials:

**Developer 1 (Sujal):**
```env
MONGODB_URI=mongodb+srv://sujalostwal6_db_user:PASSWORD@cluster0.oklnei9.mongodb.net/jobpilot?appName=Cluster0
```

**Developer 2 (Saniya):**
```env
MONGODB_URI=mongodb+srv://saniyasondkar_db_user:PASSWORD@cluster0.oklnei9.mongodb.net/jobpilot?appName=Cluster0
```

**Both access the SAME database and data!**

#### 2. Git Workflow
```bash
# Clone repository
git clone <repository-url>

# Create .env file (don't commit!)
cp .env.example .env

# Edit .env with YOUR credentials
nano .env

# Install dependencies
pip install -r requirements.txt

# Run application
python app.py
```

#### 3. Never Commit Secrets!

Ensure `.gitignore` includes:
```
.env
*.db
venv/
__pycache__/
uploads/
node_modules/
```

---

## 🔑 Demo Credentials

**Default demo account:**
```
Email:    demo@jobpilot.com
Password: demo123
```

**Preloaded data:**
- 20 Job Applications (various statuses)
- 3 Upcoming Interviews
- 2 Sample Resumes

---

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Jobs Page
![Jobs](screenshots/jobs.png)

### Analytics
![Analytics](screenshots/analytics.png)

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error:** `MONGODB_URI not found`

**Solution:**
```bash
# Check .env file exists
ls .env

# Verify MONGODB_URI is set
cat .env | grep MONGODB_URI
```

---

### Connection Failed

**Error:** `ServerSelectionTimeoutError`

**Solutions:**
1. Check MongoDB Atlas cluster is **Active**
2. Verify IP is whitelisted (`0.0.0.0/0`)
3. Check username/password in connection string
4. Ensure internet connection is stable

---

### Frontend Can't Connect to Backend

**Error:** `Network Error` or `CORS Error`

**Solutions:**
1. Ensure backend is running on port 5000
2. Check CORS settings in `app.py`
3. Verify frontend API URL in `services/api.js`

---

### Import Errors in VS Code

**Error:** `Import "mongoengine" could not be resolved`

**Solution:**
1. Press `Ctrl+Shift+P`
2. Type: `Python: Select Interpreter`
3. Choose: `./venv/Scripts/python.exe`

Or simply ignore - it's a linting warning, code will still work!

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
```bash
   git checkout -b feature/amazing-feature
```
3. **Commit** your changes
```bash
   git commit -m "Add amazing feature"
```
4. **Push** to the branch
```bash
   git push origin feature/amazing-feature
```
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.
```
MIT License

Copyright (c) 2026 JobPilot Team

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
```

---

## 👨‍💻 Authors

**Development Team:**
- **Sujal Ostwal** - Backend & Database
- **Saniya Sondkar** - Frontend & UI/UX

---

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database hosting
- React team for the amazing frontend library
- Flask community for the lightweight backend framework
- All contributors and testers

---

## 📞 Support

For support, email: support@jobpilot.com

Or open an issue on GitHub: [Issues](https://github.com/yourusername/jobpilot/issues)

---

## 🌟 Star this Repository!

If you find this project helpful, please give it a ⭐!

---

**Happy Job Hunting! 🎯**