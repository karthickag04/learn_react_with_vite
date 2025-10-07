# 🚀 Quick Start Guide

## Start Everything in 5 Steps

### 1️⃣ Start MongoDB
```bash
# Windows (if not running as service)
net start MongoDB

# Or manually
mongod
```

### 2️⃣ Start Backend Server
```bash
# Open Terminal 1
cd d:\learn_react_with_vite\session_05\node_mongo_app

# First time only
npm install

# Start server
npm run dev
```
✅ Wait for: `✅ MongoDB Connected` and `🚀 Server running on http://localhost:5000`

### 3️⃣ Start Frontend App
```bash
# Open Terminal 2 (keep backend running)
cd d:\learn_react_with_vite\session_05\react_mongo_app_client

# First time only
npm install

# Start app
npm run dev
```
✅ Wait for: `Local: http://localhost:3000/`

### 4️⃣ Open Browser
Navigate to: **http://localhost:3000**

### 5️⃣ Test CRUD Operations
- Create a user with the form
- Edit a user by clicking ✏️ Edit
- Delete a user by clicking 🗑️ Delete

---

## 🔗 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Test**: http://localhost:5000/users

---

## 🐛 Common Issues

**"Failed to fetch users"**
→ Make sure backend is running on port 5000

**"Port already in use"**
→ Kill process or change port in config files

**"DB Connection Error"**
→ Start MongoDB first

---

## 📁 Files Modified

### Backend (`node_mongo_app/`)
- ✅ `server.js` - Added CORS support
- ✅ `package.json` - Added CORS dependency and scripts

### Frontend (`react_mongo_app_client/`)
- ✅ `src/App.jsx` - Complete CRUD UI component
- ✅ `src/index.css` - Beautiful responsive styles
- ✅ `package.json` - Added axios dependency
- ✅ `vite.config.js` - Set port to 3000

---

## 💻 Terminal Commands

```bash
# Backend Terminal
cd node_mongo_app
npm install          # First time only
npm install cors     # Install CORS
npm run dev          # Start server

# Frontend Terminal
cd react_mongo_app_client
npm install          # First time only
npm run dev          # Start app
```

---

**That's it! You're ready to go! 🎉**

For detailed instructions, see: **RUNNING_INSTRUCTIONS.md**
