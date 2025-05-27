# Notes App

This is a backend project for a simple notes application developed to demonstrate backend development skills using modern technologies and best practices.

## 🔗 Live Link

👉 https://notes-app-394o.onrender.com


---

## 🛠 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **EJS** (Template Engine)
- **Multer** (for file uploads)
- **JWT (JSON Web Token)**
- **Cookies & Sessions**
- **TailwindCSS** (for frontend styling)

---

## 🚀 Features Implemented

### ✅ Authentication & Authorization
- User registration and login
- Password hashing
- JWT token generation and verification
- Middleware to protect routes

### ✅ File Uploads
- Optional profile picture upload using Multer
- Images are stored securely on **Cloudinary** (cloud image hosting with CDN support).
- Default profile image if none provided

### ✅ Database Integration
- MongoDB used for persistent storage
- Mongoose schemas and queries

### ✅ CRUD Operations
- Add, view, and manage users (core logic)
- Future extensibility for notes CRUD

### ✅ Session Management
- JWT stored in cookies for session handling
- Protected routes based on token verification

### ✅ MVC Architecture
- Clean folder structure with separate models, views, and utilities
- EJS used to render server-side views

---

## 🌐 Hosting

The project is hosted on **Render** and is publicly accessible.
