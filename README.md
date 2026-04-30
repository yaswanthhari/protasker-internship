# 🚀 ProTasker - Premium Task Management Dashboard

ProTasker is a high-end, full-stack task management application built for the **Full Stack Developer Internship** assignment. It features a modern "Glassmorphic" design, secure user authentication, and real-time database integration.

## 🔗 Live Links
- **Deployed Website**: [https://protasker-internship.vercel.app/](https://protasker-internship.vercel.app/)
- **Backend API**: [https://protasker-internship.onrender.com/](https://protasker-internship.onrender.com/)

## ✨ Key Features
- **Real-User Authentication**: Secure signup and login system using **JWT** (JSON Web Tokens) and **Bcrypt** for password hashing.
- **Full CRUD Operations**: Create, read, update status, and delete tasks seamlessly.
- **Premium Design**: Modern UI with glassmorphism effects, smooth animations, and custom icons.
- **Responsive Layout**: Fully optimized for Desktop, Tablet, and Mobile viewports.
- **Protected Routes**: Secure dashboard access only for authenticated users.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Custom Design System), React Router, Axios, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Cloud Database).
- **Authentication**: JWT & HttpOnly Cookies.
- **Deployment**: Vercel (Frontend), Render (Backend).

## 🏃 How to Run Locally

### Prerequisites
- Node.js & npm installed.
- MongoDB Atlas account or local MongoDB.

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yaswanthhari/protasker-internship.git
   cd protasker-internship
   ```

2. **Setup Backend**:
   ```bash
   cd server
   npm install
   # Create a .env file and add your MONGO_URI and JWT_SECRET
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../client
   npm install
   # Create a .env file and add VITE_API_URL=http://localhost:5000
   npm run dev
   ```

## 👤 Author
- **Yaswanth Hari** - [GitHub](https://github.com/yaswanthhari)

---
*Developed as part of the Full Stack Developer Internship selection process.*
