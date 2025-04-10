import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from "react-icons/fa";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loginEmails")) || [];
    setEmailSuggestions(stored);
  }, []);

  const saveEmailToHistory = (email) => {
    const stored = JSON.parse(localStorage.getItem("loginEmails")) || [];
    const normalizedEmail = email.toLowerCase();
    if (!stored.map(e => e.toLowerCase()).includes(normalizedEmail)) {
      stored.push(normalizedEmail);
      localStorage.setItem("loginEmails", JSON.stringify(stored));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const hardcodedEmail = "admin@gmail.com";
    const hardcodedPassword = "password";

    if (email === hardcodedEmail && password === hardcodedPassword) {
      const fakeAdmin = {
        id: 0,
        name: "Admin",
        email: hardcodedEmail,
        role: "admin",
      };

      localStorage.setItem("employeeId", fakeAdmin.id);
      localStorage.setItem("user", JSON.stringify(fakeAdmin));
      saveEmailToHistory(email);
      navigate("/dashboard");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8005/api/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("employeeId", data.id);
        localStorage.setItem("user", JSON.stringify(data));
        saveEmailToHistory(email);
        navigate("/afterlogin");
      } else {
        const errData = await response.json();
        setError(errData.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    // Placeholder: Add Google OAuth logic here
    navigate("/dashboard");
  };

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

        <form className="login-form" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                list="email-suggestions"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <datalist id="email-suggestions">
                {emailSuggestions.map((item, index) => (
                  <option key={index} value={item} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Login Button */}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <hr />
          <span>Or Login With</span>
          <hr />
        </div>

        {/* Social Login Buttons */}
        <div className="social-buttons">
          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <FaGoogle /> Continue with Google
          </button>
          <button className="facebook-btn">
            <FaFacebook /> Continue with Facebook
          </button>
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
