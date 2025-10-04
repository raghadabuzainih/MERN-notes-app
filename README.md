# MERN Notes App

A full-stack **MERN (MongoDB, Express, React, Node.js)** application for creating and managing personal notes.  
It includes **authentication**, **authorization**, **validation using Zod**, and a **modular architecture** built with **TypeScript**.

---

## Features

### Authentication & Authorization
- Register and login with email & password  
- Passwords hashed using **Argon2**  
- **JWT tokens** stored in cookies for session management  
- Role-based access control (admin / member) 

### Users Managmenet
- A new user can be added in two ways:
- Through the signup process.
- By the Admin, who can manually add a new user as either a member or another admin.
- Users can perform CRUD operations (Create, Read, Update, Delete) on their account.

### Notes Management
- Create, read, update, and delete notes  
- Each note belongs to a specific user  
- Zod validation for input data  
- Protected routes (only logged-in users can manage their notes)

### The system supports **two main user roles**:
- **Admin** – Can manage all users and notes.
- **Member** – Can manage only their own notes.

### Backend Architecture
- Built using **Express + TypeScript**
- Follows **modular structure**
- **Zod validation** for all incoming data
- Centralized **error handling middleware**
- Uses **Mongoose** for database operations

### Frontend (React)
- Built using **Vite + React + TypeScript**
- Consumes backend APIs via Axios  
- Displays, adds, edits, and deletes notes & users 

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | MongoDB (Mongoose) |
| **Validation** | Zod |
| **Security** | Argon2, JWT, Cookies |

---

## Middlewares
- `errorHandler`: Catches all Zod and server errors  
- `requireRole`: Restricts access to specific user roles  
- `authMiddleware`: Verifies JWT and user authentication 
- `errorHandler`: Catches all Zod and server errors  
- `requireRole`: Restricts access to specific user roles  
- `authMiddleware`: Verifies JWT and user authentication  
