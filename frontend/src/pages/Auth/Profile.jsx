import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import websitelogo from "../../assets/LearnSphereAI.jpeg";

const Profile = () => {
  const navigate = useNavigate();

  // Initialize user data safely
  const [userData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
    // fallback default
    return {
      name: "Tatikonda Yeshwanth",
      email: "tatikondayashwanth2005@gmail.com",
      topicsLearned: 0,
      quizzesTaken: 0,
      totalScore: 0,
      totalQuestions: 0,
    };
  });

  // Prevent division by zero
  const accuracy =
    userData.totalQuestions && userData.totalScore
      ? Math.round((userData.totalScore / userData.totalQuestions) * 100)
      : 0;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#f4f6f8", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#007bff",
        color: "#fff",
      }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/home")}>
          🌐 LearnSphere AI
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="button" onClick={() => navigate("/home")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>Home</button>
          <button type="button" onClick={() => navigate("/teach-topic")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>Teach Topic</button>
          <button type="button" onClick={() => navigate("/quiz")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>Quiz</button>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <button type="button" onClick={logout} style={{
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Logout
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "2rem 0" }}>
        <img src={websitelogo} alt="Logo" style={{ width: "120px", borderRadius: "50%" }} />
        <h1 style={{ marginTop: "1rem" }}>Profile Overview</h1>
        <p style={{ color: "#555" }}>Summary of your learning journey</p>
      </section>

      {/* PROFILE CARD */}
      <section style={{
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2>User Details</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>

        <hr style={{ margin: "1.5rem 0" }} />

        <h2>Learning Summary</h2>
        <p><strong>Topics Learned:</strong> {userData.topicsLearned}</p>
        <p><strong>Quizzes Taken:</strong> {userData.quizzesTaken}</p>
        <p><strong>Total Score:</strong> {userData.totalScore} / {userData.totalQuestions}</p>
        <p><strong>Overall Accuracy:</strong> {accuracy}%</p>
      </section>

      {/* BUTTONS */}
      <div style={{ textAlign: "center", marginTop: "2rem", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
        <button type="button" onClick={() => navigate("/profile-update")} style={{
          margin: "0 1rem",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Edit Profile
        </button>

        <button type="button" onClick={() => navigate("/home")} style={{
          margin: "0 1rem",
          padding: "10px 20px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
