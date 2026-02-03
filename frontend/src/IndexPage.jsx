import React from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundColor: "#1E1E2E", // Professional dark background
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="p-6 text-center border border-gray-200 shadow-xl"
                style={{
                    maxWidth: "450px",
                    width: "100%",
                    background: "#FFFFFF", // White card background
                    padding: "25px",
                    borderRadius: "15px",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                }}
            >
                <h2 className="text-3xl font-extrabold mb-3" style={{ color: "#FF6B00" }}>
                    📢 Digital Notice Board
                </h2>
                <p className="text-gray-700 mb-4 text-lg">
                    A modern and efficient way to stay informed with the latest official announcements.
                </p>
                <p className="text-gray-800 font-semibold text-md mb-5">
                    Please select your role to proceed:
                </p>
                <div className="flex justify-center items-center">
                    <button
                        className="px-5 py-2 font-bold text-white rounded-lg transition-all shadow-md"
                        style={{
                            backgroundColor: "#0057D9", // Blue for students
                            border: "none",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0041A3")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0057D9")}
                        onClick={() => navigate("/student-auth")}
                    >
                        🎓 Student
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        className="px-5 py-2 font-bold text-white rounded-lg transition-all shadow-md"
                        style={{
                            backgroundColor: "#FF6B00", // Orange for admins
                            border: "none",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#CC5500")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF6B00")}
                        onClick={() => navigate("/admin-login")}
                    >
                        🛠️ Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
