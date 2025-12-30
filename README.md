# User Management System - PurpleMerit Backend Developer Intern Assessment

## 👨‍💻 Candidate Information
**Name:** Aryan Kaushik  
**Email:** aryankaushik541@gmail.com  
**Position:** Backend Developer Intern  
**Assessment Period:** December 29-31, 2025

## 📋 Project Overview
A comprehensive full-stack User Management System featuring JWT authentication, role-based access control (RBAC), and complete user lifecycle management. This application demonstrates proficiency in backend development, API design, security implementation, and full-stack integration.

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js 4.18
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs (10 salt rounds)
- **Validation:** express-validator
- **Security:** CORS, helmet, rate limiting

### Frontend
- **Framework:** React 18 with Hooks
- **Routing:** React Router v6
- **State Management:** Context API + useReducer
- **HTTP Client:** Axios with interceptors
- **Styling:** CSS3 with CSS Modules
- **UI Components:** Custom responsive components

### DevOps & Tools
- **Version Control:** Git & GitHub
- **Testing:** Jest + Supertest
- **API Testing:** Postman/Thunder Client
- **Deployment:** Render (Backend), Vercel (Frontend)
- **Database Hosting:** MongoDB Atlas

## ✨ Features Implemented

### Authentication System
✅ User registration with comprehensive validation  
✅ Secure login with JWT token generation  
✅ Password hashing using bcrypt (10 rounds)  
✅ Email format validation  
✅ Password strength requirements (min 8 chars, uppercase, lowercase, number)  
✅ Token-based session management  
✅ Automatic token refresh  
✅ Secure logout functionality

### User Management (Admin Features)
✅ View all users with server-side pagination (10 per page)  
✅ Activate user accounts  
✅ Deactivate user accounts  
✅ Search and filter users  
✅ Role-based access control  
✅ User status management

### User Profile Management
✅ View personal profile information  
✅ Update full name and email  
✅ Change password with current password verification  
✅ Profile validation  
✅ Real-time form validation  
✅ Success/error notifications

### Security Features
✅ JWT token authentication  
✅ Protected API routes  
✅ Role-based authorization middleware  
✅ Password hashing with bcrypt  
✅ Input validation and sanitization  
✅ CORS configuration  
✅ Environment variable management  
✅ SQL injection prevention  
✅ XSS protection

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- MongoDB (local or Atlas account)
- Git
- npm or yarn

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Aryankaushik541/user-management-system-purplemerit.git
cd user-management-system-purplemerit/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-management
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

4. **Start the development server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

5. **Run tests**
```bash
npm test
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the development server**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-app.render.com/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### 4. Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### User Management Endpoints

#### 5. Get All Users (Admin Only)
```http
GET /api/users?page=1&limit=10
Authorization: Bearer <admin_token>
```

#### 6. Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Updated",
  "email": "newemail@example.com"
}
```

#### 7. Change Password
```http
PUT /api/users/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass123"
}
```

#### 8. Activate User (Admin Only)
```http
PUT /api/users/:id/activate
Authorization: Bearer <admin_token>
```

#### 9. Deactivate User (Admin Only)
```http
PUT /api/users/:id/deactivate
Authorization: Bearer <admin_token>
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  fullName: String (required, min: 2 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min: 8 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  status: String (enum: ['active', 'inactive'], default: 'active'),
  lastLogin: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
The project includes comprehensive tests:
- ✅ User registration validation
- ✅ User login authentication
- ✅ Password hashing verification
- ✅ JWT token generation
- ✅ Profile update logic
- ✅ Password change validation
- ✅ Complete auth flow
- ✅ Admin user management workflow
- ✅ Role-based access control

## 🚀 Deployment

### Backend Deployment (Render)
1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy

### Frontend Deployment (Vercel)
1. Build React app: `npm run build`
2. Go to https://vercel.com
3. Import GitHub repository
4. Set environment variables
5. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Whitelist IP addresses
3. Get connection string
4. Update MONGODB_URI in environment variables

## 🔒 Security Best Practices

1. **Password Security:** Bcrypt hashing with 10 salt rounds
2. **JWT Security:** Secure secret key, token expiration
3. **Input Validation:** Server-side validation with express-validator
4. **API Security:** CORS configuration, rate limiting, protected routes
5. **Environment Variables:** All secrets in `.env`, excluded from Git

## 📧 Submission Details

**Email To:** career@purplemerit.com  
**Subject:** Backend Developer Intern Assessment Submission - Aryan Kaushik

**Deliverables:**
- ✅ GitHub Repository (public)
- ✅ Live Backend API URL
- ✅ Live Frontend URL
- ✅ Video Walkthrough (3-5 minutes)
- ✅ API Documentation

## 👨‍💻 Author

**Aryan Kaushik**  
Email: aryankaushik541@gmail.com  
GitHub: [@Aryankaushik541](https://github.com/Aryankaushik541)

## 📄 License

This project is created for assessment purposes for PurpleMerit Technologies.

---

**Assessment Completed:** December 2025  
**Submission Deadline:** December 31, 2025, 11:00 AM IST

*Built with ❤️ for PurpleMerit Backend Developer Intern Assessment*