import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBullhorn } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [noticeData, setNoticeData] = useState({
        eventTitle: "",
        description: "",
        timings: "",
        otherInfo: "",
        registrationLink: "",
        department: ""
    });

    const handleChange = (e) => {
        setNoticeData({ ...noticeData, [e.target.name]: e.target.value });
    };

    const handlePostNotice = async () => {
        for (let key in noticeData) {
            if (!noticeData[key]) {
                toast.error("All fields are required!");
                return;
            }
        }

        try {
            const response = await axios.post("http://localhost:5000/post-notice", noticeData, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 201) {
                toast.success("Notice posted successfully!");
                
                setTimeout(() => {
                    setShowModal(false);
                }, 1500);

                setNoticeData({ eventTitle: "", description: "", timings: "", otherInfo: "", registrationLink: "", department: "" });
            } else {
                toast.error("Failed to post notice");
            }
        } catch (error) {
            console.error("Error while posting notice:", error.response ? error.response.data : error.message);
            toast.error("Failed to post notice");
        }
    };

    return (
        <div>
            <nav className="navbar custom-navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center text-white" href="#">
                        <FaBullhorn className="me-2 text-warning" size={24} />
                        Digital Notice Board
                    </a>
                    <ul className="navbar-nav d-flex flex-row ms-auto">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#" onClick={() => setShowModal(true)}>
                                Post Notices
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#" onClick={() => navigate("/manage-notices")}>Manage Notices</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-danger fw-bold" href="#" onClick={() => navigate("/admin-login")}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {!showModal && (
                <div className="container mt-5 d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "80vh" }}>
                    <h2 className="mb-3">Welcome to Digital Notice Board</h2>
                    <p className="lead">
                        Effortlessly manage and share notices with students. Use the options above to post or manage notices.
                    </p>
                    <div className="row mt-4 w-100 d-flex justify-content-center">
                        <div className="col-md-4">
                            <div className="card shadow-sm p-3 text-center">
                                <h5 className="text-primary">📢 Post Notices</h5>
                                <p>Click "Post Notices" to create an announcement.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm p-3 text-center">
                                <h5 className="text-success">📂 Manage Notices</h5>
                                <p>Edit or remove outdated notices easily.</p>
                            </div>
                        </div> <br />
                        <div className="col-md-4">
                            <div className="card shadow-sm p-3 text-center">
                                <h5 className="text-warning">🎯 Department Notices</h5>
                                <p>Target updates to specific departments or all students.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Post a Notice</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {Object.keys(noticeData).map((field, index) => (
                                    field !== "department" && (
                                        <div key={index} className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                                                name={field}
                                                value={noticeData[field]}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )
                                ))}
                                <div className="mb-2">
                                    <select className="form-control" name="department" value={noticeData.department} onChange={handleChange} required>
                                        <option value="">Select Department</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ECE">ECE</option>
                                        <option value="MECH">MECH</option>
                                        <option value="CIVIL">CIVIL</option>
                                        <option value="EEE">EEE</option>
                                        <option value="ALL">ALL</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handlePostNotice}>Post Notice</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
