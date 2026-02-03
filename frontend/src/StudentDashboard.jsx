import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBullhorn, FaClock, FaBookOpen, FaInfoCircle, FaBuilding, FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./StudentDashboard.css";

const departmentList = ["All", "CSE", "IT", "ECE", "MECH", "CIVIL", "EEE"];

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [filteredNotices, setFilteredNotices] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [studentDepartment, setStudentDepartment] = useState("");

    useEffect(() => {
        const storedStudent = localStorage.getItem("student");

        if (storedStudent) {
            const studentData = JSON.parse(storedStudent);
            setStudentDepartment(studentData.department);
            setSelectedDepartment(studentData.department); // Set default selection to user's department
        } else {
            navigate("/student-auth"); // Redirect to login if no student data is found
        }
    }, [navigate]);

    useEffect(() => {
        axios.get("http://localhost:5000/notices")
            .then(response => {
                if (response.data.length > 0) {
                    const sortedNotices = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setNotices(sortedNotices);
                } else {
                    toast.warn("No notices available");
                }
            })
            .catch(error => {
                console.error("Error fetching notices:", error);
                toast.error("Failed to fetch notices");
            });
    }, []);

    useEffect(() => {
        if (selectedDepartment === "All") {
            setFilteredNotices(notices);
        } else {
            setFilteredNotices(notices.filter(notice => notice.department === selectedDepartment));
        }
    }, [selectedDepartment, notices]);

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar custom-navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center text-white" href="#">
                        <FaBullhorn className="me-2 text-warning" size={24} />
                        Digital Notice Board
                    </a>
                    <ul className="navbar-nav d-flex flex-row ms-auto">
                        <select
                            className="form-select w-auto ms-3"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                        >
                            {departmentList.map((dept, index) => (
                                <option key={index} value={dept}>{dept}</option>
                            ))}
                        </select>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link text-white" onClick={() => navigate("/student-profile")}>
                                Profile
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link text-danger fw-bold" onClick={() => navigate("/student-auth")}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Notices Section */}
            <div className="container p-4">
                <h2 className="text-center fw-bold mb-4">📢 Latest - Notices</h2>
                {filteredNotices.length > 0 ? (
                    <div className="row justify-content-center g-3">
                        {filteredNotices.map((notice) => (
                            <div key={notice._id} className="col-md-3 col-sm-6 col-12 mb-3">
                                <div className="card shadow-sm border-0 small-card">
                                    <div className="card-body">
                                        <h6 className="card-title text-primary fw-bold">
                                            <FaBookOpen className="me-2 text-success" /> {notice.eventTitle}
                                        </h6>
                                        <p><FaInfoCircle className="me-2 text-info" /><strong>Description:</strong> {notice.description}</p>
                                        <p><FaClock className="me-2 text-warning" /><strong>Timings:</strong> {notice.timings}</p>
                                        <p><FaBuilding className="me-2 text-secondary" /><strong>Department:</strong> {notice.department}</p>
                                        <p><strong>Other Info:</strong> {notice.otherInfo}</p>
                                        {notice.registrationLink && (
                                            <p>
                                                <FaExternalLinkAlt className="me-2 text-danger" />
                                                <strong>Reg URL:</strong>  
                                                <a href={notice.registrationLink} target="_blank" rel="noopener noreferrer" className="ms-1">
                                                    Click Here
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted">No notices found.</p>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
