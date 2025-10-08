# MERN Notes App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing personal notes with secure authentication, authorization.
 
---

## Project URLs
- **Backend:** http://localhost:3000  
- **Frontend:** http://localhost:5173  

---

## Features

### Authentication & Authorization
- Register and login with email & password (frontend + backend)
- Passwords hashed using **Argon2**
- **JWT tokens** stored in cookies for session management
- Role-based access control (Admin / Member)
- **dotenv** used for managing environment variables
- Show success/failed alerts after submitting the form

### Notes Management
- Full **CRUD** for notes (frontend + backend)
- Each note belongs to a specific user
- Admins can view all notes; members can view only their own
- Showing dialogs for adding, editing & deleting note

### User Management
- Users can register via signup form  
- Admins can manually add new users (as Admin or Member)  
- CRUD operations for user accounts
- Protected routes — only authenticated users can access their data  

### Backend Architecture
- Built with **Express + TypeScript**
- Uses **Mongoose** for MongoDB
- CORS enabled for secure cross-origin communication between client and server
- **Zod** for request validation
- **dotenv** for environment configuration
- Centralized **error handling middleware**
- **authMiddleware** for verifying JWT
- **requireRole** for access restriction
- **checkUser** to identify the current user if exists and attach their data

### Frontend (React)
- Built with **Vite + React + TypeScript**
- Uses **Material UI (MUI)** for UI components
- Routing handled by **React Router**
- Form validation using **Formik + Yup**
- API requests handled by **Axios**