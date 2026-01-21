import { useNavigate, Link } from "react-router-dom"; // import Link & useNavigate
import "../../styles/Login.css"; // import CSS
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add real authentication logic
    // For now, redirect to HomePage
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand">LearnSphere AI</h1>
        <p className="subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>

        <div className="footer-text">
          <span>Forgot your password?</span>
          <Link to="/signup"> Create new account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
