import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import websitelogo from "../../assets/LearnSphereAI.jpeg";

const topicsList = [
  "Mathematics - Algebra",
  "Mathematics - Calculus",
  "Science - Physics",
  "Science - Chemistry",
  "Programming - Python",
  "Programming - AI & ML",
];

const topicVideos = {
  "Mathematics - Algebra": [
    "https://www.youtube.com/embed/aircAruvnKk",
    "https://www.youtube.com/embed/ZK3O402wf1c",
  ],
  "Mathematics - Calculus": [
    "https://www.youtube.com/embed/WUvTyaaNkzM",
    "https://www.youtube.com/embed/7gigNsz4Oe8",
  ],
  "Science - Physics": [
    "https://www.youtube.com/embed/1rLWVZVWfdY",
    "https://www.youtube.com/embed/ZAqIoDhornk",
  ],
  "Science - Chemistry": [
    "https://www.youtube.com/embed/FSyAehMdpyI",
    "https://www.youtube.com/embed/e8rY5kE5Z9M",
  ],
  "Programming - Python": [
    "https://www.youtube.com/embed/_uQrJ0TkZlc",
    "https://www.youtube.com/embed/rfscVS0vtbw",
  ],
  "Programming - AI & ML": [
    "https://www.youtube.com/embed/aircAruvnKk",
    "https://www.youtube.com/embed/GwIo3gDZCVQ",
  ],
};

// Recommended Learning Platforms
const recommendedPlatforms = [
  {
    title: "Great Learning",
    desc: "Structured beginner-to-advanced learning paths",
    link: "https://www.mygreatlearning.com",
    gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
    icon: "🎓",
  },
  {
    title: "Udemy",
    desc: "Industry-ready courses with hands-on projects",
    link: "https://www.udemy.com",
    gradient: "linear-gradient(135deg, #a445b2, #d41872)",
    icon: "📘",
  },
  {
    title: "YouTube",
    desc: "Free expert explanations & tutorials",
    link: "https://www.youtube.com",
    gradient: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    icon: "▶️",
  },
];

const TeachTopic = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(topicsList[0]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToQuiz = () => {
    localStorage.setItem("selectedTopic", selectedTopic);
    navigate("/quiz");
  };

  return (
    <div style={pageStyle}>
      {/* NAVBAR */}
      <nav style={navbarStyle}>
        <div style={logoStyle} onClick={() => navigate("/home")}>
          🌐 LearnSphere AI
        </div>

        <div style={navLinksContainerStyle}>
          <Link to="/home" style={navLinkStyle}>Home</Link>
          <Link to="/teach-topic" style={navLinkStyle}>Teach Topic</Link>
          <Link to="/quiz" style={navLinkStyle}>Quiz</Link>
        </div>

        <button onClick={logout} style={logoutButtonStyle}>Logout</button>
      </nav>

      {/* HERO */}
      <section style={heroSectionStyle}>
        <img src={websitelogo} alt="logo" style={heroLogoStyle} />
        <h1>Teach Topic</h1>
        <p>AI-powered personalized learning experience</p>
      </section>

      {/* TOPIC SELECTION */}
      <section style={topicSectionStyle}>
        <h2>Select a Topic</h2>
        <select
          style={topicDropdownStyle}
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          {topicsList.map((topic, idx) => (
            <option key={idx}>{topic}</option>
          ))}
        </select>
      </section>

      {/* EXPLANATION & VIDEOS */}
      <section style={explanationSectionStyle}>
        <h2>🧠 AI-Guided Explanation</h2>
        <p>
          You selected <strong>{selectedTopic}</strong>.  
          Learn step-by-step with AI explanations and real-world examples.
        </p>

        {/* Videos */}
        <div style={videoGridStyle}>
          {topicVideos[selectedTopic].map((video, index) => (
            <iframe
              key={index}
              src={video}
              title="Learning Video"
              allowFullScreen
              style={videoFrameStyle}
            />
          ))}
        </div>

        {/* Recommended Platforms */}
        <div style={{ marginTop: "3rem" }}>
          <h3>🎓 Recommended Learning Platforms</h3>
          <div style={resourceGridStyle}>
            {recommendedPlatforms.map((platform, idx) => (
              <ResourceCard key={idx} {...platform} />
            ))}
          </div>
        </div>

        {/* CONTINUE TO QUIZ */}
        <div style={continueCardStyle} onClick={goToQuiz}>
          <h3>➡️ Continue to Quiz</h3>
          <p>Questions will be generated based on your topic</p>
        </div>
      </section>
    </div>
  );
};

/* ================= COMPONENT ================= */

const ResourceCard = ({ title, desc, link, gradient, icon }) => (
  <div
    style={{ ...resourceCardStyle, background: gradient }}
    onClick={() => window.open(link, "_blank")}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div style={{ fontSize: "2.3rem" }}>{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
    <div style={exploreButtonStyle}>Explore Course →</div>
  </div>
);

/* ================= STYLES ================= */

const pageStyle = { fontFamily: "Poppins, sans-serif", background: "#f4f6f8", minHeight: "100vh" };
const navbarStyle = { display: "flex", justifyContent: "space-between", padding: "1rem 2rem", background: "#007bff", color: "#fff" };
const logoStyle = { fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" };
const navLinksContainerStyle = { display: "flex", gap: "2rem" };
const navLinkStyle = { color: "#fff", textDecoration: "none" };
const logoutButtonStyle = { background: "#ff4d4d", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px" };
const heroSectionStyle = { textAlign: "center", padding: "2.5rem" };
const heroLogoStyle = { width: "120px", borderRadius: "50%" };
const topicSectionStyle = { background: "#fff", maxWidth: "700px", margin: "2rem auto", padding: "1.5rem", borderRadius: "12px", textAlign: "center" };
const topicDropdownStyle = { width: "80%", padding: "10px" };
const explanationSectionStyle = { background: "#fff", maxWidth: "950px", margin: "2rem auto", padding: "2rem", borderRadius: "14px" };
const videoGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" };
const videoFrameStyle = { width: "100%", height: "220px", borderRadius: "12px", border: "none" };
const resourceGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.8rem", marginTop: "1.5rem" };
const resourceCardStyle = { padding: "1.6rem", borderRadius: "18px", color: "#fff", textAlign: "center", cursor: "pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.25)", transition: "transform 0.3s ease" };
const exploreButtonStyle = { marginTop: "1rem", padding: "10px 20px", background: "rgba(255,255,255,0.25)", borderRadius: "30px", fontWeight: "bold" };
const continueCardStyle = { marginTop: "3rem", padding: "1.8rem", background: "#007bff", color: "#fff", borderRadius: "16px", textAlign: "center", cursor: "pointer" };

export default TeachTopic;
