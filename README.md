# HRMS Lite — Employee & Attendance Management System

A full-stack Employee Management and Attendance Tracking system built with **React**, **FastAPI**, and **MySQL**.  
This project demonstrates clean architecture, REST APIs, database relationships, and real-world deployment workflow.

---

-  Frontend: https://h-m-r-s-project.vercel.app/
-  Backend API Docs: https://h-m-r-s-project-1.onrender.com/docs

---

 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- FastAPI
- SQLAlchemy ORM
- Pydantic
- Uvicorn

### Database
- MySQL (Railway Cloud)

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → Railway

---

 Features

### Employee Management
- Add Employee
- View Employee List
- Delete Employee
- Input validation & error handling

### Attendance Management
- Mark Attendance (Present / Absent)
- View Attendance Records
- Delete Attendance with confirmation
- Proper relational mapping with employee data

### UI / UX
- Corporate admin dashboard layout
- Loading states
- Empty states
- Error messages
- Responsive design

---
 Project Structure
 HMRS-Project/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── employee/
│ │ │ ├── layout/
│ │ │ └── ui/
│ │ │
│ │ ├── pages/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Employees.jsx
│ │ │ └── Attendance.jsx
│ │ │
│ │ ├── services/
│ │ │ └── api.js
│ │ │
│ │ ├── App.jsx
│ │ └── main.jsx
│
├── backend/
│ ├── app/
│ │ ├── core/
│ │ │ └── database.py
│ │ │
│ │ ├── models/
│ │ │ ├── employee.py
│ │ │ └── attendance.py
│ │ │
│ │ ├── schemas/
│ │ │ ├── employee.py
│ │ │ └── attendance.py
│ │ │
│ │ ├── routers/
│ │ │ ├── employee.py
│ │ │ └── attendance.py
│ │ │
│ │ └── main.py
│ │
│ ├── requirements.txt
│ └── .env
│
└── README.md

