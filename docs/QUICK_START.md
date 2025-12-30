# Quick Start Guide - User Management System

Get your User Management System up and running in 10 minutes!

## 🚀 Quick Setup (Local Development)

### Step 1: Clone Repository (30 seconds)
```bash
git clone https://github.com/Aryankaushik541/user-management-system-purplemerit.git
cd user-management-system-purplemerit
```

### Step 2: Setup Backend (3 minutes)
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
nano .env  # or use your preferred editor
```

**Minimum .env configuration:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_super_secret_key_min_32_characters
CLIENT_URL=http://localhost:3000
```

### Step 3: Start Backend (1 minute)
```bash
# Start development server
npm run dev

# You should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

### Step 4: Test Backend (1 minute)
Open new terminal:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return: {"success":true,"message":"Server is running"}
```

### Step 5: Setup Frontend (3 minutes)
```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

### Step 6: Access Application (1 minute)
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 🎯 First Steps

### 1. Register Your First User
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Fill in details:
   - Full Name: Your Name
   - Email: your@email.com
   - Password: YourPass123
4. Click "Register"

### 2. Create Admin User
**Option A: Via MongoDB**
```bash
# Connect to MongoDB
mongosh

# Use database
use user-management

# Update user to admin
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

**Option B: Via MongoDB Compass**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to `user-management` → `users`
4. Find your user
5. Edit: Change `role` from "user" to "admin"
6. Save

### 3. Login as Admin
1. Logout if logged in
2. Login with your credentials
3. You should now see "Admin Dashboard" in navigation

---

## 📝 Quick API Testing

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

**Get Current User (replace TOKEN):**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman
1. Import collection from `docs/postman_collection.json`
2. Set `baseUrl` variable to `http://localhost:5000`
3. Run requests

---

## 🧪 Running Tests

```bash
# Navigate to backend
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 🐛 Troubleshooting

### Backend won't start
**Error:** `MongoDB connection error`
- **Solution:** Make sure MongoDB is running
  ```bash
  # Start MongoDB
  mongod
  
  # Or use MongoDB Atlas connection string
  ```

**Error:** `Port 5000 already in use`
- **Solution:** Change PORT in `.env` or kill process
  ```bash
  # Find process
  lsof -i :5000
  
  # Kill process
  kill -9 PID
  ```

### Frontend won't start
**Error:** `Cannot connect to backend`
- **Solution:** Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`

### Can't login
**Error:** `Invalid credentials`
- **Solution:** Verify password meets requirements (min 8 chars, uppercase, lowercase, number)
- Check MongoDB has user with correct email

### CORS errors
**Error:** `Access blocked by CORS policy`
- **Solution:** Verify `CLIENT_URL` in backend `.env` matches frontend URL
- Restart backend after changing `.env`

---

## 📚 Next Steps

1. **Read Full Documentation**
   - [API Documentation](./API_DOCUMENTATION.md)
   - [Deployment Guide](./DEPLOYMENT_GUIDE.md)

2. **Explore Features**
   - User registration and login
   - Admin dashboard with user management
   - Profile updates
   - Password changes
   - Role-based access control

3. **Deploy to Production**
   - Follow [Deployment Guide](./DEPLOYMENT_GUIDE.md)
   - Deploy backend to Render
   - Deploy frontend to Vercel
   - Setup MongoDB Atlas

4. **Customize**
   - Add more user fields
   - Implement email verification
   - Add password reset
   - Enhance UI/UX

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT.io](https://jwt.io/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)

---

## 💡 Pro Tips

1. **Use Environment Variables**
   - Never commit `.env` files
   - Use different values for dev/prod
   - Keep secrets secure

2. **Test Regularly**
   - Run tests before committing
   - Test all endpoints
   - Verify error handling

3. **Monitor Logs**
   - Check backend console for errors
   - Use browser DevTools for frontend
   - Monitor MongoDB connections

4. **Keep Dependencies Updated**
   ```bash
   npm outdated
   npm update
   ```

5. **Use Git Properly**
   ```bash
   # Commit often with clear messages
   git add .
   git commit -m "feat: add user profile update"
   git push origin main
   ```

---

## 🆘 Need Help?

- **Documentation:** Check `docs/` folder
- **Issues:** Create GitHub issue
- **API Reference:** See `docs/API_DOCUMENTATION.md`
- **Deployment:** See `docs/DEPLOYMENT_GUIDE.md`

---

## ✅ Checklist

Before submitting:
- [ ] Backend running locally
- [ ] Frontend running locally
- [ ] Can register new user
- [ ] Can login
- [ ] Admin dashboard accessible
- [ ] All tests passing
- [ ] Code committed to GitHub
- [ ] README updated
- [ ] Environment variables documented
- [ ] Deployment completed
- [ ] Video walkthrough recorded

---

**Happy Coding! 🚀**

*Last Updated: December 30, 2025*