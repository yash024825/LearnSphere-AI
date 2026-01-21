import React from "react";
import { Link, useNavigate } from "react-router-dom";
import websitelogo from "../../assets/LearnSphereAI.jpeg";

const Home = () => {
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Navigate to Profile page
  const goToProfile = () => {
    navigate("/profile-update");
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
      {/* ================= NAVBAR ================= */}
      <nav style={navbarStyle}>
        {/* Logo */}
        <div style={logoStyle} onClick={() => navigate("/home")}>
          🌐 LearnSphere AI
        </div>

        {/* Navigation Links */}
        <div style={navLinksContainerStyle}>
          <Link to="/home" style={navLinkStyle}>Home</Link>
          <Link to="/teach-topic" style={navLinkStyle}>Teach Topic</Link>
          <Link to="/quiz" style={navLinkStyle}>Quiz</Link>
        </div>

        {/* Logout & Profile */}
        <div style={profileContainerStyle}>
          <button onClick={logout} style={logoutButtonStyle}>
            Logout
          </button>

          <div
            onClick={goToProfile}
            style={profileIconStyle}
            title="Profile"
          >
            P
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section style={heroSectionStyle}>
        <img src={websitelogo} alt="LearnSphere AI Logo" style={heroLogoStyle} />
        <h1 style={{ marginTop: "1rem", color: "#333" }}>
          Welcome to LearnSphere AI
        </h1>
        <p style={{ color: "#555" }}>
          Your AI-powered personalized learning platform
        </p>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section style={aboutSectionStyle}>
        <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>About LearnSphere AI</h2>
        <p style={{ color: "#555", lineHeight: "1.8", textAlign: "justify" }}>
          LearnSphere AI is an intelligent learning platform designed to provide personalized education experiences.
          Users can learn topics, take AI-generated quizzes, track performance, and receive adaptive learning recommendations.
          The platform is built with scalable architecture, secure authentication, and modular React components — suitable for
          real-world production systems.
        </p>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section style={contactSectionStyle}>
        <h2>Contact Us</h2>
        <p>Email: support@learnsphereai.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: Hyderabad, Telangana, India</p>
        <p>Follow us on: 🌐 LinkedIn | 📘 Facebook | 🐦 Twitter</p>
      </section>
    </div>
  );
};

/* ================= STYLES ================= */
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  background: "#007bff",
  color: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const logoStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  cursor: "pointer",
};

const navLinksContainerStyle = {
  display: "flex",
  gap: "2rem",
  fontSize: "1rem",
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

const profileContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const logoutButtonStyle = {
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: "bold",
};

const profileIconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#fff",
  color: "#007bff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
};

const heroSectionStyle = {
  textAlign: "center",
  padding: "2rem 0",
};

const heroLogoStyle = {
  width: "150px",
  borderRadius: "50%",
};

const aboutSectionStyle = {
  maxWidth: "900px",
  margin: "2rem auto",
  padding: "1.5rem",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const contactSectionStyle = {
  background: "#007bff",
  color: "#fff",
  padding: "2rem 0",
  textAlign: "center",
};

export default Home;
