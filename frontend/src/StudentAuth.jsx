import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import "./StudentAuth.css"; // External CSS

const StudentAuth = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        regNumber: "",
        email: "",
        password: "",
        department: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isSignup ? "http://localhost:5000/signup" : "http://localhost:5000/login";
            const response = await axios.post(endpoint, formData);

            console.log("Response from server:", response.data);
            toast.success(response.data.message); // Show success toast

            if (isSignup) {
                setIsSignup(false); // Switch to login form after signup
            } else {
                // Store student details in localStorage after login
                localStorage.setItem("student", JSON.stringify(response.data.user));

                setTimeout(() => {
                    navigate("/student-dashboard"); // Navigate to student profile after login
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error.response?.data?.message);
            toast.error(error.response?.data?.message || "Authentication failed"); // Show error toast
            setError(error.response?.data?.message || "Authentication failed");
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer /> {/* Toast notifications container */}
            <div className="auth-card">
                <h2 className="auth-title">{isSignup ? "Student Signup" : "Student Login"}</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    {isSignup && (
                        <>
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="auth-input" />
                            <input type="text" name="regNumber" placeholder="Registration Number" value={formData.regNumber} onChange={handleChange} required className="auth-input" />
                        </>
                    )}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="auth-input" />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="auth-input" />
                    {isSignup && (
                        <select name="department" value={formData.department} onChange={handleChange} required className="auth-input">
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                            <option value="EEE">EEE</option>
                        </select>
                    )}
                    <button type="submit" className="auth-button">{isSignup ? "Sign up" : "Login"}</button>
                </form>
                <p className="toggle-text">
                    {isSignup ? "Already have an account?" : "New here?"}
                    <button className="toggle-button" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? "Log in" : "Sign up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default StudentAuth;
