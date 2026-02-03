import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import IndexPage from "./IndexPage";
import StudentAuth from "./StudentAuth";
import StudentDashboard from "./StudentDashboard";
import StudentProfile from "./StudentProfile";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ManageNotices from "./ManageNotices";

function App() {
    return (
        <Router>
            {/* ToastContainer placed at the highest level */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/student-auth" element={<StudentAuth />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/student-profile" element={<StudentProfile />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manage-notices" element={<ManageNotices />} />
            </Routes>
        </Router>
    );
}

export default App;
