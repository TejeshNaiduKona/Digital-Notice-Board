import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBullhorn, FaClock, FaFileAlt, FaInfoCircle, FaLink, FaUniversity, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./ManageNotices.css"; 

const ManageNotices = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [selectedNoticeId, setSelectedNoticeId] = useState(null);

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

    const openDeleteModal = (id) => {
        setSelectedNoticeId(id);
        const modal = new window.bootstrap.Modal(document.getElementById("deleteModal"));
        modal.show();
    };

   const confirmDelete = () => {
        if (!selectedNoticeId) {
            toast.error("No notice selected for deletion.");
            return;
        }

        axios.delete(`http://localhost:5000/notices/${selectedNoticeId}`)
            .then(response => {
                if (response.status === 200) {
                    setNotices(prevNotices => prevNotices.filter(notice => notice._id !== selectedNoticeId));
                    toast.success("Notice deleted successfully!");

                    const modalElement = document.getElementById("deleteModal");
                    if (modalElement) {
                        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                        if (modalInstance) {
                            modalInstance.hide();
                        }
                    }
                } else {
                    toast.error("Failed to delete notice.");
                }
            })
            .catch(error => {
                console.error("Error deleting notice:", error);
                toast.error("Failed to delete notice. Please try again.");
            });
    };

    return (
        <div>
            <nav className="navbar custom-navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center text-white" href="http://localhost:5173/admin-dashboard#">
                        <FaBullhorn className="me-2 text-warning" size={24} />
                        Digital Notice Board
                    </a>
                    <ul className="navbar-nav d-flex flex-row ms-auto">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#" onClick={() => navigate("/admin-dashboard")}>Post Notice</a>
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

            <div className="container p-4">
                <h2 className="text-center fw-bold mb-4">Manage Notices</h2>
                {notices.length > 0 ? (
                    <div className="row justify-content-center g-3">
                        {notices.map((notice) => (
                            <div key={notice._id} className="col-md-3 col-sm-6 col-12 mb-3">
                                <div className="card shadow-sm border-0 small-card">
                                    <div className="card-body">
                                        <h6 className="card-title text-primary fw-bold">
                                            <FaBullhorn className="me-2 text-warning" /> {notice.eventTitle}
                                        </h6>
                                        <p> <strong>Description:</strong> {notice.description}</p>
                                        <p><strong>Timings:</strong> {notice.timings}</p>
                                        <p><strong>Other Info:</strong> {notice.otherInfo}</p>
                                        <p><strong>Dept:</strong> {notice.department}</p>
                                        <div className="mt-2">
                                            <p>
                                              
                                                <strong>Reg URL:</strong>
                                                <a href={notice.registrationLink} target="_blank" rel="noopener noreferrer">
                                                   clickHere
                                                </a>
                                            </p>
                                        

                                        </div>
                                           <div className="btn-container">
    <button className="btn btn-primary btn-sm" onClick={() => toast.info("Edit feature coming soon!")}>
       Edit
    </button>
    <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(notice._id)}>
       Delete
    </button>
</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted">No notices found.</p>
                )}
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this notice? This action cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageNotices;
