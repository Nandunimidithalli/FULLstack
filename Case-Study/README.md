# 🎓 Student Management System — Full-Stack Web Application

A modern full-stack web application for student tracking, enrollment status management, and departmental analytics using **React (Vite)**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

---

## 📁 Repository Directory Structure

```text
Case-Study/
├── backend/
│   ├── .env.example              # Backend environment template
│   ├── package.json              # Express, Mongoose, CORS, Dotenv dependencies
│   ├── server.js                 # Express server & MongoDB Atlas connection
│   ├── models/
│   │   └── Student.js            # Mongoose Student schema & validation
│   ├── controllers/
│   │   └── studentController.js  # CRUD controller handlers
│   └── routes/
│       └── studentRoutes.js      # REST API route endpoints
├── frontend/
│   ├── .env.example              # Frontend Vite environment template
│   ├── index.html                # HTML5 root template
│   ├── package.json              # React 18 & Vite build dependencies
│   ├── vite.config.js            # Vite configuration
│   └── src/
│       ├── App.css               # Application layout & UI styling
│       ├── App.jsx               # Main React application & state management
│       ├── index.css             # Base reset & design variables
│       ├── main.jsx              # React 18 DOM mount point
│       ├── components/
│       │   ├── Navbar.jsx        # Top header & quick actions
│       │   ├── Sidebar.jsx       # Navigation sidebar
│       │   ├── StatCard.jsx      # Reusable dashboard analytics metric card
│       │   ├── StudentForm.jsx   # Add/Edit student form with validation
│       │   └── StudentTable.jsx  # Student directory data table
│       ├── data/
│       │   └── initialStudents.js# Default department list & fallback records
│       └── pages/
│           ├── AddStudent.jsx    # Enroll student view
│           ├── Dashboard.jsx     # Overview & analytics view
│           ├── EditStudent.jsx   # Modify student view
│           └── ViewStudents.jsx  # Full directory with search & filters
├── .gitignore                    # Ignored files (node_modules, .env)
└── README.md                     # Documentation & setup instructions
```

---

## 🚀 Key Features

1. **Modular Architecture:**
   - Model-View-Controller (MVC) pattern on the backend (`models/`, `controllers/`, `routes/`).
   - Component-driven React architecture on the frontend (`components/`, `pages/`).

2. **MongoDB Atlas Cloud Database:**
   - Automated cloud connection with Mongoose.
   - Unique constraints on roll numbers to prevent duplicate entries.
   - Graceful fallback to offline mock data if backend server is not connected.

3. **Complete RESTful CRUD API:**
   - `GET /api/students` - Retrieve all student records (supports search, department, and status filters).
   - `GET /api/students/:id` - Fetch single student details.
   - `POST /api/students` - Register new student document.
   - `PUT /api/students/:id` - Update existing student document.
   - `DELETE /api/students/:id` - Permanently remove student document.

4. **Responsive React Dashboard:**
   - Live KPI metric cards (Total, Active, Inactive, Departments).
   - Instant search and filtering by department or status.
   - Toast notifications for real-time operation feedback.

---

## 💻 Local Setup & Execution Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (or local MongoDB running)

---

### 1. Backend Setup

```bash
cd Case-Study/backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start Express server
npm start
```
*Backend API runs at: `http://localhost:5000`*

---

### 2. Frontend Setup

```bash
cd Case-Study/frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start Vite development server
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## 📡 REST API Documentation

| Method | Endpoint | Action / Purpose |
| :--- | :--- | :--- |
| `GET` | `/` | API status and health check |
| `GET` | `/api/students` | Get all students (supports `?search=`, `?department=`, `?status=`) |
| `GET` | `/api/students/:id` | Get student details by ID |
| `POST` | `/api/students` | Create new student |
| `PUT` | `/api/students/:id` | Update student by ID |
| `DELETE` | `/api/students/:id` | Delete student by ID |

---

## 📜 License
Licensed under the [MIT License](https://opensource.org/licenses/MIT).
