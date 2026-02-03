import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentAuth.css";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (adminCredentials.email === "vishnu@gmail.com" && adminCredentials.password === "admin") {
            toast.success("Login successful! Redirecting...");
            setTimeout(() => {
                navigate("/admin-dashboard"); // Redirect to admin dashboard
            }, 2000);
        } else {
            toast.error("Invalid admin credentials!");
            setError("Invalid admin credentials!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h3 className="auth-title">Admin Login</h3>
                {error && <p className="error-text">{error}</p>}
                
                <form onSubmit={handleAdminLogin} className="auth-form">
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={adminCredentials.email}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                        required
                        className="auth-input"
                    /> 
                    <input
                        type="password"
                        placeholder="Admin Password"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                        required
                        className="auth-input"
                    /> 
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>

                <p className="auth-footer">
                    Not an admin? {" "}
                    <button className="auth-link" onClick={() => navigate("/")}>Go back</button>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AdminLogin;