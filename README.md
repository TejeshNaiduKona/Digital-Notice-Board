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

## 📁 Project Structure

```
Digital-Notice-Board/
├── backend/                  # Node.js + Express server
│   ├── server.js            # Main server file with all routes
│   ├── User.js              # User model
│   ├── Notice.js            # Notice model
│   ├── userController.js    # User business logic
│   ├── noticeController.js  # Notice business logic
│   ├── userRoutes.js        # User API routes
│   ├── noticeRoutes.js      # Notice API routes
│   ├── db.js                # Database configuration
│   ├── package.json
│   └── .env                 # Environment variables
│
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── AdminDashboard.jsx      # Admin dashboard page
│   │   ├── AdminLogin.jsx          # Admin login page
│   │   ├── StudentAuth.jsx         # Student auth page
│   │   ├── StudentDashboard.jsx    # Student dashboard
│   │   ├── StudentProfile.jsx      # Student profile
│   │   ├── ManageNotices.jsx       # Admin notice management
│   │   ├── IndexPage.jsx           # Landing page
│   │   ├── Navbar.js               # Navigation component
│   │   ├── NoticeCard.js           # Notice card component
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # App entry point
│   │   ├── index.css               # Global styles
│   │   ├── App.css                 # App-specific styles
│   │   ├── AdminDashboard.css
│   │   ├── ManageNotices.css
│   │   ├── StudentAuth.css
│   │   ├── StudentDashboard.css
│   │   ├── StudentProfile.css
│   │   ├── styles.css
│   │   └── assets/                 # Static assets
│   ├── public/                     # Public assets
│   ├── vite.config.js             # Vite configuration
│   ├── eslint.config.js           # ESLint configuration
│   ├── package.json
│   └── index.html
│
└── README.md                 # This file
```

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

## 📦 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **firebase-admin** - Firebase integration
- **nodemon** - Development auto-reload (dev dependency)

### Frontend
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **bootstrap** - CSS framework
- **tailwindcss** - Utility-first CSS
- **react-icons** - Icon library
- **react-toastify** - Toast notifications
- **vite** - Build tool

---

## 🎯 Usage Examples

### 1. Register a New Student
1. Navigate to `/student-auth`
2. Click on "Sign Up"
3. Fill in the registration form with your details
4. Submit to create account

### 2. Login as Student
1. Navigate to `/student-auth`
2. Enter email and password
3. Click "Login"
4. View your dashboard with all available notices

### 3. Admin Login & Post Notice
1. Navigate to `/admin-login`
2. Enter admin credentials
3. Go to `/manage-notices`
4. Click "Create New Notice"
5. Fill in notice details and submit

### 4. View Notices by Department
1. After login, navigate to `/student-dashboard`
2. See all notices from your department
3. Click on a notice to see full details

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

---

## 🔐 Security Features

- 🔒 Password hashing with bcrypt
- 🚫 Input validation on all endpoints
- 🔄 CORS protection
- ⚠️ Error handling and logging
- 🛡️ MongoDB injection protection via Mongoose

---

## 📈 Future Enhancements

- [ ] JWT token authentication for better security
- [ ] Admin authentication system
- [ ] Email notifications for new notices
- [ ] File/image upload for notices
- [ ] Search functionality
- [ ] Advanced filtering options
- [ ] User roles and permissions management
- [ ] Notice categories and tags
- [ ] Analytics and reporting dashboard
- [ ] Mobile app (React Native)
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Push notifications

---

## 📄 License

This project is licensed under the ISC License.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues and questions, please open an issue in the repository.

---

## 🙏 Acknowledgments

- **Express.js** community
- **MongoDB** documentation
- **React** ecosystem
- All contributors and users

---

**Made with ❤️ for Educational Institutions**
