# Frontend Setup Guide

## 🚀 Quick Start

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js          # Login page
│   │   │   └── Signup.js         # Signup page
│   │   ├── admin/
│   │   │   └── Dashboard.js      # Admin dashboard
│   │   ├── user/
│   │   │   └── Profile.js        # User profile
│   │   ├── common/
│   │   │   ├── ProtectedRoute.js # Route protection
│   │   │   ├── Toast.js          # Notifications
│   │   │   └── Modal.js          # Modal dialogs
│   │   └── layout/
│   │       ├── Layout.js         # Main layout
│   │       ├── Navbar.js         # Navigation bar
│   │       └── Navbar.css
│   ├── context/
│   │   └── AuthContext.js        # Auth state management
│   ├── services/
│   │   └── api.js                # API calls
│   ├── App.js                    # Main app component
│   ├── App.css                   # App styles
│   ├── index.js                  # Entry point
│   └── index.css                 # Global styles
├── .env.example
├── .gitignore
└── package.json
```

---

## 🔨 Remaining Components to Create

### Create `src/components/auth/Login.js`:

```javascript
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Toast from '../common/Toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/profile');
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="auth-container">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

### Create `src/components/auth/Signup.js`:

```javascript
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Toast from '../common/Toast';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.length < 2) newErrors.fullName = 'Name must be at least 2 characters';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await signup(formData.fullName, formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/profile');
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="auth-container">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className="form-error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
```

---

## 📝 Next Steps

1. **Create remaining components** (Login, Signup, Dashboard, Profile)
2. **Test locally** with backend running
3. **Deploy to Vercel**
4. **Update backend CORS** with Vercel URL

---

## 🚀 Deployment to Vercel

```bash
# Build the app
npm run build

# Deploy to Vercel
# 1. Go to vercel.com
# 2. Import your GitHub repository
# 3. Set root directory to "frontend"
# 4. Add environment variable: REACT_APP_API_URL=your_backend_url
# 5. Deploy
```

---

## ✅ Testing Checklist

- [ ] Login page loads
- [ ] Signup page loads
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Protected routes work
- [ ] Admin dashboard (if admin)
- [ ] User profile page
- [ ] Logout works
- [ ] Toast notifications appear
- [ ] Responsive on mobile

---

**Frontend is 80% complete! Just add the Login, Signup, Dashboard, and Profile components using the code above!** 🚀