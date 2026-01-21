import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import HomePage from "./pages/Auth/Home";
import TeachTopic from "./pages/Auth/TeachTopic";
import Quiz from "./pages/Auth/Quiz";
import Profile from "./pages/Auth/Profile"; // import the profile page

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main App Routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/teach-topic" element={<TeachTopic />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* Profile Route */}
        <Route path="/profile-update" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
