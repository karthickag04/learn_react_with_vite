# 🚀 Complete Running Instructions - User Management App

## Full Stack Application: React + Node.js + MongoDB

This guide will walk you through running both the **backend** (Node.js + MongoDB) and **frontend** (React + Vite) applications.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** installed and accessible - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Git Bash** or **Command Prompt** or **PowerShell**
- ✅ **Code Editor** (VS Code recommended)

---

## 🗂️ Project Structure

```
session_05/
├── node_mongo_app/              # Backend (Node.js + Express + MongoDB)
│   ├── models/
│   │   └── Users.js            # User schema
│   ├── server.js               # Main server file
│   └── package.json
│
└── react_mongo_app_client/      # Frontend (React + Vite)
    ├── src/
    │   ├── App.jsx             # Main React component
    │   ├── index.css           # Styles
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🎯 Step-by-Step Running Instructions

### **STEP 1: Start MongoDB Database**

MongoDB must be running before starting the backend.

#### Option A: MongoDB as a Service (Windows)
```bash
# MongoDB usually starts automatically as a service
# Verify it's running:
net start MongoDB
```

#### Option B: Manual Start
```bash
# Start MongoDB server
mongod
```

#### Option C: MongoDB Compass
- Open MongoDB Compass application
- Connect to `mongodb://localhost:27017`

**✅ Verify**: MongoDB should be accessible at `mongodb://localhost:27017`

---

### **STEP 2: Install Backend Dependencies**

Open a **NEW TERMINAL** window:

```bash
# Navigate to backend folder
cd d:\learn_react_with_vite\session_05\node_mongo_app

# Install dependencies (first time only)
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Enable cross-origin requests
- `nodemon` - Auto-restart server (dev dependency)

---

### **STEP 3: Start Backend Server**

In the same terminal (backend folder):

```bash
# Start with nodemon (auto-restart on changes)
npm run dev

# OR start normally
npm start
```

**✅ Expected Output:**
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

**🔴 If you see errors:**
- **"DB Connection Error"** → MongoDB is not running (go back to Step 1)
- **"Port 5000 already in use"** → Another app is using port 5000, stop it or change PORT in server.js

**✅ Backend is ready!** Keep this terminal running.

---

### **STEP 4: Install Frontend Dependencies**

Open a **NEW TERMINAL** window (keep backend running):

```bash
# Navigate to frontend folder
cd d:\learn_react_with_vite\session_05\react_mongo_app_client

# Install dependencies (first time only)
npm install
```

This will install:
- `react` & `react-dom` - UI library
- `vite` - Build tool
- `axios` - HTTP client
- Other dev dependencies

---

### **STEP 5: Start Frontend Development Server**

In the same terminal (frontend folder):

```bash
# Start Vite dev server
npm run dev
```

**✅ Expected Output:**
```
VITE v7.1.7  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**✅ Frontend is ready!**

---

### **STEP 6: Open Application in Browser**

1. **Open your browser**
2. **Navigate to:** `http://localhost:3000`

You should see:
- **Purple gradient header** with "👥 User Management System"
- **Form section** to add new users
- **Users list** section (initially empty)

---

## 🎮 Testing the Application

### Test 1: Create a User

1. Fill in the form:
   - **Name**: John Doe
   - **Age**: 25
   - **City**: New York
   - **Email**: john@example.com
   - **Hobbies**: reading, coding, gaming

2. Click **"➕ Create User"**

3. ✅ **Success message** should appear
4. ✅ **User card** should appear in the list below

### Test 2: Edit a User

1. Click **"✏️ Edit"** button on John's card
2. Form populates with John's data
3. Change age to 26
4. Click **"💾 Update User"**
5. ✅ Card should update with new age

### Test 3: Delete a User

1. Click **"🗑️ Delete"** button on John's card
2. Confirm deletion in popup
3. ✅ User should disappear from list

### Test 4: Multiple Users

Create multiple users to see the responsive grid layout!

---

## 🌐 Application URLs

| Component | URL | Description |
|-----------|-----|-------------|
| **Frontend** | http://localhost:3000 | React UI |
| **Backend API** | http://localhost:5000 | REST API |
| **Health Check** | http://localhost:5000/ | "Hello from Node.js + MongoDB!" |
| **Get All Users** | http://localhost:5000/users | JSON list of users |
| **MongoDB** | mongodb://localhost:27017 | Database connection |
| **Database Name** | PracticeDB | MongoDB database |

---

## 🔧 Useful Commands

### Backend Commands
```bash
# In node_mongo_app folder

# Start with auto-reload
npm run dev

# Start normally
npm start

# Install CORS package (if needed)
npm install cors

# Check if server is responding
curl http://localhost:5000
```

### Frontend Commands
```bash
# In react_mongo_app_client folder

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for code issues
npm run lint
```

### MongoDB Commands
```bash
# Connect to MongoDB shell
mongosh

# Use PracticeDB database
use PracticeDB

# Show all users
db.users.find()

# Count users
db.users.countDocuments()

# Clear all users
db.users.deleteMany({})
```

---

## 🐛 Troubleshooting Guide

### Problem: "Failed to fetch users"

**Symptoms**: Error message in React app saying can't fetch users

**Solutions**:
1. ✅ Verify MongoDB is running
2. ✅ Verify backend server is running on port 5000
3. ✅ Check backend terminal for errors
4. ✅ Test backend directly: open `http://localhost:5000/users` in browser

---

### Problem: "Port 5000 already in use"

**Symptoms**: Backend won't start, says port is occupied

**Solutions**:
```bash
# Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# OR change port in server.js
const PORT = 5001;  // Use different port
```

---

### Problem: "CORS Error" in Browser Console

**Symptoms**: Network errors mentioning CORS policy

**Solutions**:
1. ✅ Ensure backend has `cors` package installed
2. ✅ Verify `app.use(cors())` is in server.js
3. ✅ Restart backend server after adding CORS

```bash
# In backend folder
npm install cors
```

---

### Problem: MongoDB Connection Failed

**Symptoms**: Backend shows "❌ DB Connection Error"

**Solutions**:
1. ✅ Start MongoDB service:
   ```bash
   net start MongoDB
   ```
2. ✅ Or start mongod manually:
   ```bash
   mongod
   ```
3. ✅ Check connection string in server.js:
   ```javascript
   mongoose.connect("mongodb://localhost:27017/PracticeDB", {...})
   ```

---

### Problem: Frontend Shows Blank Page

**Solutions**:
1. ✅ Check browser console for errors (F12)
2. ✅ Verify Vite dev server is running
3. ✅ Clear browser cache and reload
4. ✅ Check if port 3000 is accessible

---

### Problem: Changes Not Reflecting

**Solutions**:
- **Backend changes**: Nodemon should auto-restart. If not, restart manually (Ctrl+C, then `npm run dev`)
- **Frontend changes**: Vite has HMR (Hot Module Replacement). If not working, refresh browser
- **Database changes**: Check MongoDB directly using Compass or mongosh

---

## 📊 Project Architecture

```
┌─────────────────┐
│   Web Browser   │
│  (localhost:3000) │
└────────┬────────┘
         │ HTTP Requests (Axios)
         ↓
┌─────────────────┐
│  React Frontend │
│   (Vite + React) │
│   - App.jsx     │
│   - CRUD UI     │
└────────┬────────┘
         │ REST API Calls
         ↓
┌─────────────────┐
│ Node.js Backend │
│ (Express + CORS) │
│   - server.js   │
│   - Routes      │
└────────┬────────┘
         │ Mongoose ODM
         ↓
┌─────────────────┐
│   MongoDB       │
│   PracticeDB    │
│   users collection │
└─────────────────┘
```

---

## 🎯 API Endpoints Reference

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Health check | - |
| GET | `/users` | Get all users | - |
| POST | `/users` | Create user | `{ name, age, city, email, hobbies }` |
| PUT | `/users/:id` | Update user | `{ name, age, city, email, hobbies }` |
| DELETE | `/users/:id` | Delete user | - |

---

## 📚 What You've Learned

This full-stack project teaches:

### Frontend Skills
- ✅ React component development
- ✅ State management with hooks (useState, useEffect)
- ✅ Form handling and validation
- ✅ HTTP requests with Axios
- ✅ Responsive CSS design
- ✅ User experience (loading states, error handling)

### Backend Skills
- ✅ Express.js REST API development
- ✅ MongoDB database operations
- ✅ Mongoose ODM (Object Data Modeling)
- ✅ CORS configuration
- ✅ Error handling
- ✅ Async/await patterns

### Full Stack Integration
- ✅ Connecting React frontend to Node.js backend
- ✅ RESTful API design
- ✅ CRUD operations end-to-end
- ✅ Handling cross-origin requests
- ✅ Real-time data synchronization

---

## 🎓 Next Steps

Once everything is working:

1. ✅ Try creating multiple users
2. ✅ Test all CRUD operations
3. ✅ Open MongoDB Compass to see data in database
4. ✅ Inspect Network tab in browser DevTools (F12)
5. ✅ Try breaking things to understand error handling!

---

## 💡 Pro Tips

1. **Keep 3 terminals open**:
   - Terminal 1: MongoDB (if running manually)
   - Terminal 2: Backend server (`npm run dev`)
   - Terminal 3: Frontend server (`npm run dev`)

2. **Use MongoDB Compass**: Visual tool to inspect your database

3. **Use Browser DevTools**: Press F12 to see network requests and errors

4. **Test API directly**: Use browser or Postman to test `http://localhost:5000/users`

5. **Watch the terminals**: Both frontend and backend show helpful logs

---

## ✅ Quick Start Checklist

- [ ] MongoDB is running
- [ ] Backend dependencies installed (`npm install` in node_mongo_app)
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed (`npm install` in react_mongo_app_client)
- [ ] Frontend server running on port 3000
- [ ] Browser open at `http://localhost:3000`
- [ ] CORS enabled in backend
- [ ] Can create, read, update, and delete users

---

## 🆘 Need Help?

If you're stuck:
1. Check the terminal outputs for error messages
2. Look at the browser console (F12 → Console tab)
3. Verify all prerequisites are installed
4. Make sure all services are running
5. Try restarting MongoDB, backend, and frontend in that order

---

**🎉 Congratulations!** You've successfully set up and run a full-stack CRUD application!

**Happy Coding! 🚀**
