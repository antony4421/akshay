import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from "react-icons/fa";
import "./login.css"; // Import the CSS file

const LoginPage = () => {
  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Simplify Management With Our Dashboard</h2>
        <p>Manage your e-commerce seamlessly with our user-friendly dashboard.</p>
        <img src="shopping.png" alt="Dashboard Illustration" className="dashboard-img" />
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="logo-container">
          <img src="shopping.png" alt="Logo" className="logo" />
          <h2>Welcome Back</h2>
        </div>
        <p className="subtitle">Login to continue shopping</p>

        <form className="login-form">
          {/* Email Field */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="you@example.com" required />
            </div>
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input type="password" placeholder="********" required />
            </div>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button className="login-btn">Login</button>
        </form>

        {/* Divider */}
        <div className="divider">
          <hr />
          <span>Or Login With</span>
          <hr />
        </div>

        {/* Social Login Buttons */}
        <div className="social-buttons">
          <button className="google-btn"><FaGoogle /> Continue with Google</button>
          <button className="facebook-btn"><FaFacebook /> Continue with Facebook</button>
        </div>

        {/* Signup Redirect */}
        <p className="signup-text">
          Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
