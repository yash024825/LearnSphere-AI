import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ================= QUESTION BANK ================= */

const quizData = {
  "Mathematics - Algebra": [
    {
      question: "What is the solution of 2x + 5 = 13?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      answer: "x = 4",
    },
    {
      question: "What is the degree of 3x + 7 = 0?",
      options: ["0", "1", "2", "3"],
      answer: "1",
    },
  ],

  "Science - Physics": [
    {
      question: "What is the SI unit of force?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      answer: "Newton",
    },
    {
      question: "Which law explains action and reaction?",
      options: [
        "Newton's First Law",
        "Newton's Second Law",
        "Newton's Third Law",
        "Law of Gravitation",
      ],
      answer: "Newton's Third Law",
    },
    {
      question: "What is the speed of light?",
      options: [
        "3 × 10⁶ m/s",
        "3 × 10⁸ m/s",
        "1.5 × 10⁸ m/s",
        "9.8 m/s²",
      ],
      answer: "3 × 10⁸ m/s",
    },
  ],

  "Science - Chemistry": [
    {
      question: "What is the chemical symbol for Sodium?",
      options: ["So", "Na", "S", "Sn"],
      answer: "Na",
    },
    {
      question: "pH value less than 7 indicates?",
      options: ["Base", "Salt", "Acid", "Neutral"],
      answer: "Acid",
    },
  ],

  "Programming - Python": [
    {
      question: "Which keyword defines a function in Python?",
      options: ["func", "define", "def", "function"],
      answer: "def",
    },
    {
      question: "Which data type is immutable?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      answer: "Tuple",
    },
  ],
};

/* ============ FALLBACK AI-LIKE QUESTIONS ============ */

const generateFallbackQuestions = (topic) => [
  {
    question: `What is the core concept of ${topic}?`,
    options: [
      "Basic principles",
      "Advanced frameworks",
      "Unrelated theory",
      "None of the above",
    ],
    answer: "Basic principles",
  },
  {
    question: `Why is ${topic} important in real-world applications?`,
    options: [
      "Industry usage",
      "Academic relevance",
      "Technological growth",
      "All of the above",
    ],
    answer: "All of the above",
  },
];

/* ================= QUIZ COMPONENT ================= */

const Quiz = () => {
  const navigate = useNavigate();

  const selectedTopic =
    localStorage.getItem("selectedTopic") || "Mathematics - Algebra";

  const questions =
    quizData[selectedTopic] || generateFallbackQuestions(selectedTopic);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) finalScore++;
    });
    setScore(finalScore);
    setSubmitted(true);
  };

  return (
    <div style={pageStyle}>
      {/* NAVBAR */}
      <nav style={navbarStyle}>
        <div style={logoStyle} onClick={() => navigate("/home")}>
          🌐 LearnSphere AI
        </div>

        <div style={navLinksStyle}>
          <Link to="/home" style={navLinkStyle}>Home</Link>
          <Link to="/teach-topic" style={navLinkStyle}>Teach Topic</Link>
          <Link to="/quiz" style={navLinkStyle}>Quiz</Link>
        </div>
      </nav>

      <h1 style={titleStyle}>📝 Quiz</h1>
      <h3 style={{ textAlign: "center", color: "#007bff" }}>
        Topic: {selectedTopic}
      </h3>

      {!submitted ? (
        <>
          {questions.map((q, index) => (
            <div key={index} style={questionCardStyle}>
              <h4>{index + 1}. {q.question}</h4>

              {q.options.map((option, idx) => (
                <label key={idx} style={optionStyle}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    onChange={() => handleSelect(index, option)}
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
          ))}

          <button style={submitButtonStyle} onClick={handleSubmit}>
            Submit Quiz
          </button>
        </>
      ) : (
        <div style={resultCardStyle}>
          <h2>🎉 Quiz Completed</h2>
          <p>
            Score: <strong>{score}</strong> / {questions.length}
          </p>
          <p>
            Accuracy:{" "}
            <strong>{Math.round((score / questions.length) * 100)}%</strong>
          </p>

          <button
            style={backButtonStyle}
            onClick={() => navigate("/teach-topic")}
          >
            Back to Learning
          </button>
        </div>
      )}
    </div>
  );
};

/* ================= STYLES ================= */

const pageStyle = {
  fontFamily: "Poppins, sans-serif",
  background: "#f4f6f8",
  minHeight: "100vh",
};

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem 2rem",
  background: "#007bff",
  color: "#fff",
};

const logoStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  cursor: "pointer",
};

const navLinksStyle = {
  display: "flex",
  gap: "2rem",
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const titleStyle = {
  textAlign: "center",
  margin: "1.5rem 0",
};

const questionCardStyle = {
  background: "#fff",
  padding: "1.5rem",
  margin: "1.5rem auto",
  maxWidth: "900px",
  borderRadius: "12px",
};

const optionStyle = {
  display: "block",
  marginTop: "0.6rem",
};

const submitButtonStyle = {
  display: "block",
  margin: "2rem auto",
  padding: "12px 30px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

const resultCardStyle = {
  maxWidth: "500px",
  margin: "3rem auto",
  background: "#fff",
  padding: "2rem",
  borderRadius: "14px",
  textAlign: "center",
};

const backButtonStyle = {
  marginTop: "1.5rem",
  padding: "10px 22px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
};

export default Quiz;
