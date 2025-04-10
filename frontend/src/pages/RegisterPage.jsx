import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaHome } from "react-icons/fa";
import "./login.css"; // Reuse the same CSS

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      setError("Please fill in all required fields!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8005/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errData = await response.json();
        setError(errData.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error registering:", err);
      setError("Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Join Our Premium Marketplace</h2>
        <p>Create your account and start shopping with exclusive deals.</p>
        <img src="shopping.png" alt="Register Illustration" className="dashboard-img" />
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="logo-container">
          <img src="shopping.png" alt="Logo" className="logo" />
          <h2>Create Account</h2>
        </div>
        <p className="subtitle">Sign up to get started</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="input-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <FaPhone className="input-icon" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="1234567890"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="input-group">
            <label>Address</label>
            <div className="input-wrapper">
              <FaHome className="input-icon" />
              <input
                type="text"
                name="address"
                placeholder="Street, City, Zip"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Error or Success Message */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          {/* Submit Button */}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already Registered */}
        <p className="signup-text">
          Already have an account? <Link to="/login" className="signup-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
