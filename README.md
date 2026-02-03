# 📋 Digital Notice Board

A full-stack web application for managing and displaying digital notices in educational institutions. Students can view notices by department, while administrators can manage and post new notices.

---

## 🌟 Features

### Student Features
- ✅ User Registration & Login
- ✅ View all notices from different departments
- ✅ Filter notices by department
- ✅ View detailed notice information
- ✅ User profile management

### Admin Features
- ✅ Admin login
- ✅ Create and post new notices
- ✅ Edit existing notices
- ✅ Delete notices
- ✅ Dashboard with analytics
- ✅ Manage notices by department

### General Features
- 🔐 Secure password hashing with bcrypt
- 💾 MongoDB database integration
- 📱 Responsive UI with React
- 🎨 Modern styling with Bootstrap & Tailwind CSS
- ⚡ Fast performance with Vite
- 🔄 RESTful API architecture

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (Local or MongoDB Atlas)

### Installation & Setup

#### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd Digital-Notice-Board
```

#### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create a .env file (if not exists)
# Add your MongoDB URI:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Start the backend server
npm start
```

**Backend will run on:** `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

---

## 🔌 API Endpoints

All API endpoints are defined directly in [server.js](backend/server.js).

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user |

**Request Body (Signup):**
```json
{
  "name": "John Doe",
  "regNumber": "2021001",
  "email": "john@example.com",
  "password": "password123",
  "department": "Computer Science"
}
```

**Request Body (Login):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Notice Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notices` | Get all notices |
| GET | `/notices/:department` | Get notices by department |
| POST | `/notices` | Create a new notice |
| PUT | `/notices/:id` | Update a notice |
| DELETE | `/notices/:id` | Delete a notice |

**Request Body (Create/Update Notice):**
```json
{
  "eventTitle": "Tech Workshop",
  "description": "A comprehensive workshop on web development",
  "timings": "2024-02-15, 10:00 AM - 4:00 PM",
  "otherInfo": "Bring your laptop",
  "registrationLink": "https://example.com/register",
  "department": "Computer Science"
}
```

---

## 🔧 Configuration

### Backend Configuration

**Environment Variables (.env):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

> **Note:** The backend uses port 5000 by default. Update `PORT` in server.js if needed.

### Frontend Configuration

**Vite Configuration:**
The frontend is pre-configured with Vite. Default settings work out of the box.

**API Integration:**
API calls should be made to `http://localhost:5000` (backend server URL).

---

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- ✅ Verify MongoDB URI in `.env` file
- ✅ Ensure your IP address is whitelisted in MongoDB Atlas
- ✅ Check MongoDB Atlas cluster is running
- ✅ Verify database credentials are correct
- ✅ Check network/internet connectivity

### Port Already in Use
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use PowerShell
Stop-Process -Name "node" -Force
```

### CORS Errors
- ✅ Backend has CORS enabled for all origins by default
- ✅ Check if backend server is running on port 5000
- ✅ Clear browser cache and try again

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall (Windows PowerShell)
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

## 🔐 Security Features

- 🔒 Password hashing with bcrypt
- 🚫 Input validation on all endpoints
- 🔄 CORS protection
- ⚠️ Error handling and logging
- 🛡️ MongoDB injection protection via Mongoose

---