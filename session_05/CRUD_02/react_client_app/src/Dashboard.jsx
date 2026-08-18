import React from "react";
import UserList from "./UserList";

function Dashboard({ currentUser, onLogout }) {
    return (
        <div style={{ maxWidth: "850px", margin: "30px auto", padding: "20px", fontFamily: "sans-serif" }}>
            {/* Welcome / Dashboard Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#f0f4f8",
                    padding: "20px 25px",
                    borderRadius: "8px",
                    border: "1px solid #d0d7de",
                    marginBottom: "30px"
                }}
            >
                <div>
                    <h2 style={{ margin: "0 0 8px 0", color: "#1f2328" }}>
                        Welcome, {currentUser?.name || "User"}! 👋
                    </h2>
                    <p style={{ margin: 0, color: "#57606a", fontSize: "14px" }}>
                        Logged in as: <strong>{currentUser?.email}</strong> | Role: <span style={{ padding: "2px 8px", backgroundColor: "#0969da", color: "white", borderRadius: "12px", fontSize: "12px" }}>{currentUser?.role}</span>
                    </p>
                </div>

                <button
                    onClick={onLogout}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#cf222e",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px"
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Read All Users Component */}
            <UserList />
        </div>
    );
}

export default Dashboard;
