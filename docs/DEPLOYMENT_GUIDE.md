# Deployment Guide - User Management System

This guide covers deploying the User Management System to production environments.

## Prerequisites
- GitHub account
- MongoDB Atlas account
- Render/Railway account (Backend)
- Vercel account (Frontend)

---

## Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free tier (M0)
3. Verify your email

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select cloud provider and region (closest to you)
4. Name your cluster: `user-management-cluster`
5. Click "Create"

### Step 3: Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin` (or your choice)
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note:** For production, restrict to specific IPs
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `user-management`

**Example:**
```
mongodb+srv://admin:YOUR_PASSWORD@user-management-cluster.xxxxx.mongodb.net/user-management?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Backend
1. Ensure all code is committed to GitHub
2. Verify `package.json` has correct start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `user-management-system-purplemerit`
4. Configure:
   - **Name:** `user-management-backend`
   - **Region:** Choose closest region
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 4: Set Environment Variables
Click "Advanced" → "Add Environment Variable":

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/user-management
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long_change_this
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Important:** 
- Use your actual MongoDB connection string
- Generate a strong JWT_SECRET (min 32 characters)
- Update CLIENT_URL after deploying frontend

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://user-management-backend.onrender.com`

### Step 6: Test Backend
```bash
curl https://user-management-backend.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Part 3: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. Create `frontend` directory in your repository
2. Initialize React app or copy existing frontend code
3. Create `.env.production` file:
```env
REACT_APP_API_URL=https://user-management-backend.onrender.com/api
```

### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub account
3. Authorize Vercel

### Step 3: Import Project
1. Click "Add New" → "Project"
2. Import `user-management-system-purplemerit`
3. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

### Step 4: Set Environment Variables
Add environment variable:
```
REACT_APP_API_URL=https://user-management-backend.onrender.com/api
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Copy your frontend URL: `https://your-app.vercel.app`

### Step 6: Update Backend CORS
1. Go back to Render dashboard
2. Update `CLIENT_URL` environment variable with your Vercel URL
3. Redeploy backend

---

## Part 4: Create Admin User

### Option 1: Using MongoDB Compass
1. Download MongoDB Compass
2. Connect using your connection string
3. Navigate to `user-management` database → `users` collection
4. Insert document:
```json
{
  "fullName": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$hashed_password_here",
  "role": "admin",
  "status": "active",
  "createdAt": "2025-12-30T00:00:00.000Z",
  "updatedAt": "2025-12-30T00:00:00.000Z"
}
```

### Option 2: Using API
1. Register a normal user via API
2. Manually update role to "admin" in MongoDB Atlas

---

## Part 5: Testing Deployment

### Test Backend API
```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Register user
curl -X POST https://your-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"Test1234"}'

# Login
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

### Test Frontend
1. Open your Vercel URL in browser
2. Try to register a new user
3. Login with credentials
4. Test all features

---

## Part 6: Alternative Deployment Options

### Backend Alternatives

#### Railway
1. Go to https://railway.app
2. Connect GitHub repository
3. Select backend directory
4. Add environment variables
5. Deploy

#### Heroku
1. Install Heroku CLI
2. `heroku create user-management-backend`
3. `git push heroku main`
4. `heroku config:set MONGODB_URI=...`

### Frontend Alternatives

#### Netlify
1. Go to https://netlify.com
2. Drag and drop `build` folder
3. Or connect GitHub repository
4. Set environment variables
5. Deploy

---

## Part 7: Post-Deployment Checklist

### Backend
- [ ] API health endpoint working
- [ ] MongoDB connection successful
- [ ] Environment variables set correctly
- [ ] CORS configured for frontend URL
- [ ] All endpoints responding correctly
- [ ] Error handling working
- [ ] Logs accessible

### Frontend
- [ ] Application loads without errors
- [ ] API calls working
- [ ] Login/signup functional
- [ ] Admin dashboard accessible
- [ ] User profile updates working
- [ ] Responsive design working
- [ ] No console errors

### Database
- [ ] Connection string working
- [ ] Admin user created
- [ ] Indexes created
- [ ] Backup configured (optional)

---

## Part 8: Monitoring & Maintenance

### Render Monitoring
- Check logs: Dashboard → Logs
- Monitor performance: Dashboard → Metrics
- Set up alerts for downtime

### Vercel Monitoring
- Check deployments: Dashboard → Deployments
- View analytics: Dashboard → Analytics
- Monitor performance

### MongoDB Atlas Monitoring
- Check metrics: Dashboard → Metrics
- Monitor connections
- Set up alerts

---

## Part 9: Troubleshooting

### Common Issues

**1. Backend not connecting to MongoDB**
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials

**2. CORS errors**
- Update CLIENT_URL in backend environment variables
- Redeploy backend after changes
- Check CORS configuration in server.js

**3. Frontend can't reach backend**
- Verify REACT_APP_API_URL is correct
- Check backend is running
- Test backend endpoints directly

**4. JWT token errors**
- Verify JWT_SECRET is set
- Check token expiration time
- Ensure token is sent in Authorization header

**5. Render free tier sleeping**
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading for production

---

## Part 10: Security Best Practices

### Production Checklist
- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] Secure MongoDB password
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] Environment variables not in code
- [ ] CORS restricted to frontend URL only
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info

---

## Deployment URLs

After deployment, update these in your README:

```markdown
## Live Deployment

- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://user-management-backend.onrender.com/api
- **API Documentation:** https://user-management-backend.onrender.com/api/health

### Test Credentials
- **Admin:** admin@example.com / Admin123
- **User:** user@example.com / User123
```

---

## Support

If you encounter issues:
1. Check Render/Vercel logs
2. Verify environment variables
3. Test backend endpoints with Postman
4. Check MongoDB Atlas connection
5. Review error messages carefully

---

**Last Updated:** December 30, 2025  
**Version:** 1.0.0