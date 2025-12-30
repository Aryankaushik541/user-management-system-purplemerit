# API Documentation - User Management System

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-app.onrender.com/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## HTTP Status Codes
- `200` - OK (Success)
- `201` - Created (Resource created successfully)
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error

---

## Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules:**
- `fullName`: Required, 2-100 characters
- `email`: Required, valid email format
- `password`: Required, min 8 characters, must contain uppercase, lowercase, and number

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

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### 2. Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "lastLogin": "2025-12-30T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `403` - Account deactivated

---

### 3. Get Current User
Get authenticated user's information.

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2025-12-29T10:00:00.000Z",
    "updatedAt": "2025-12-30T10:30:00.000Z"
  }
}
```

---

### 4. Logout
Logout current user (client-side token removal).

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## User Management Endpoints

### 5. Get All Users (Admin Only)
Retrieve paginated list of all users.

**Endpoint:** `GET /api/users`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name or email
- `role` (optional): Filter by role (user/admin)
- `status` (optional): Filter by status (active/inactive)

**Example:** `GET /api/users?page=1&limit=10&search=john&status=active`

**Success Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2025-12-30T10:30:00.000Z",
      "createdAt": "2025-12-29T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3,
    "hasMore": true
  }
}
```

---

### 6. Get User Profile
Get current user's profile information.

**Endpoint:** `GET /api/users/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2025-12-29T10:00:00.000Z",
    "updatedAt": "2025-12-30T10:30:00.000Z"
  }
}
```

---

### 7. Update Profile
Update user's profile information.

**Endpoint:** `PUT /api/users/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "fullName": "John Updated",
  "email": "newemail@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Updated",
    "email": "newemail@example.com",
    "role": "user",
    "status": "active"
  }
}
```

---

### 8. Change Password
Change user's password.

**Endpoint:** `PUT /api/users/password`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

---

### 9. Get User by ID (Admin Only)
Get specific user details by ID.

**Endpoint:** `GET /api/users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "lastLogin": "2025-12-30T10:30:00.000Z",
    "createdAt": "2025-12-29T10:00:00.000Z"
  }
}
```

---

### 10. Activate User (Admin Only)
Activate a user account.

**Endpoint:** `PUT /api/users/:id/activate`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User John Doe activated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

---

### 11. Deactivate User (Admin Only)
Deactivate a user account.

**Endpoint:** `PUT /api/users/:id/deactivate`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User John Doe deactivated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "inactive"
  }
}
```

---

### 12. Delete User (Admin Only)
Permanently delete a user account.

**Endpoint:** `DELETE /api/users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User John Doe deleted successfully"
}
```

---

## Postman Collection

Import this collection to test all endpoints:

```json
{
  "info": {
    "name": "User Management System API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/auth/signup",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"fullName\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"Test1234\"\n}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"Test1234\"\n}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## Rate Limiting

Authentication endpoints are rate-limited to prevent abuse:
- **Window:** 15 minutes
- **Max Requests:** 100 per window

---

## Security Notes

1. **JWT Tokens:** Expire after 7 days (configurable)
2. **Password Hashing:** bcrypt with 10 salt rounds
3. **CORS:** Configured for specific origins
4. **Input Validation:** All inputs are validated and sanitized
5. **Error Messages:** Generic messages to prevent information leakage

---

**Last Updated:** December 30, 2025  
**Version:** 1.0.0