import { Link } from "react-router-dom";
import "../../styles/Login.css"; // reuse the same styling for simplicity

const Signup = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand">LearnSphere AI</h1>
        <p className="subtitle">Create your account</p>

        <form className="login-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>

        <div className="footer-text">
          <span>Already have an account?</span>
          <Link to="/"> Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
