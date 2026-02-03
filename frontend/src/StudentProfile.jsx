import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBullhorn, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentProfile.css"; // Import external CSS

const StudentProfile = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const storedStudent = localStorage.getItem("student");

        if (storedStudent) {
            setStudent(JSON.parse(storedStudent));
        } else {
            navigate("/student-auth"); // Redirect to login if no student data is found
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("student"); // Remove student data from localStorage
        navigate("/student-auth"); // Redirect to login page
    };

    if (!student) return <p>Loading...</p>;

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar custom-navbar fixed-top">
                <div className="container-fluid">
                    <button className="navbar-brand d-flex align-items-center text-white btn btn-link p-0"
                        onClick={() => navigate("/student-dashboard")}>
                        <FaBullhorn className="me-2 text-warning" size={54} />
                        Digital Notice Board
                    </button>
                    <ul className="navbar-nav d-flex flex-row ms-auto">
                        <li className="nav-item">
                            <button className="btn btn-link nav-link text-white" onClick={() => navigate("/student-dashboard")}>
                                Dashboard
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link text-danger fw-bold" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Profile Section */}
            <div className="profile-container">
                <div className="profile-card shadow-sm border p-4">
                    <div className="text-center mb-3">
                        <FaUserCircle size={60} className="text-secondary" />
                    </div>
                    <h4 className="text-center">My Profile</h4>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Registration Number:</strong> {student.regNumber}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Department:</strong> {student.department}</p>
                    <button onClick={handleLogout} className="btn btn-danger w-100 mt-3">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
