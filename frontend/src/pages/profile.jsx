import React, {  Fragment,useEffect, useState } from 'react';
import axios from 'axios';
import './css/profile.css';
import { useNavigate } from 'react-router-dom';
import Banner from "../components/Banner/Banner";

export default function ProfileInfo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);

  const employeeId = localStorage.getItem("employeeId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8005/api/employees/${employeeId}`);
        const { name, email, phoneNumber } = response.data;
        const nameParts = name.split(' ');
        setFirstName(nameParts[0]);
        setLastName(nameParts[1] || '');
        setEmail(email);
        setMobile(phoneNumber);
      } catch (error) {
        console.error("Failed to fetch profile info:", error);
      }
    };

    fetchProfile();
  }, [employeeId]);

  const updateProfile = async () => {
    try {
      const updatedData = {
        name: `${firstName} ${lastName}`,
        email,
        phoneNumber: mobile
      };
      await axios.put(`http://localhost:8005/api/employees/${employeeId}`, updatedData);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Fragment>
      <Banner title="product" />
    <div className="custom-profile-container">
      <div className="custom-back-button-container">
        <button className="custom-back-button" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <aside className="custom-sidebar">
        <h2 className="custom-sidebar-title">Account Settings</h2>
        <div className="custom-sidebar-section">
          <button className="custom-sidebar-button active" onClick={() => navigate('/profile')}>Profile Information</button>
          <button className="custom-sidebar-button" onClick={() => navigate('/addresses')}>Manage Addresses</button>
        </div>

        

        <h2 className="custom-sidebar-title">My Stuff</h2>
        <div className="custom-sidebar-section">
          <button className="custom-sidebar-button" onClick={() => navigate('/myorder')}>My orders</button>
          <button className="custom-sidebar-button" onClick={() => navigate('/wishlist')}>My Wishlist</button>
        </div>

        <button className="custom-sidebar-button custom-logout-button" onClick={() => navigate('/login')}>Logout</button>
      </aside>

      <div className="custom-main-content">
        <div className="custom-main-header">
          <h1 className="custom-main-title">Personal Information</h1>
        </div>

        <div className="custom-info-card">
          <div className="custom-info-row">
            <div className="custom-info-group">
              <label className="custom-info-label">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="custom-info-input"
              />
            </div>
            <div className="custom-info-group">
              <label className="custom-info-label">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="custom-info-input"
              />
            </div>
          </div>

          <div className="custom-info-group">
            <label className="custom-info-label">Email Address</label>
            {editingEmail ? (
              <div className="custom-info-editing">
                <input
                  type="email"
                  className="custom-info-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => { setEditingEmail(false); updateProfile(); }} className="custom-edit-button">Save</button>
              </div>
            ) : (
              <div className="custom-info-display">
                <span>{email}</span>
                <button onClick={() => setEditingEmail(true)} className="custom-edit-button">Edit</button>
              </div>
            )}
          </div>

          <div className="custom-info-group">
            <label className="custom-info-label">Mobile Number</label>
            {editingMobile ? (
              <div className="custom-info-editing">
                <input
                  type="tel"
                  className="custom-info-input"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <button onClick={() => { setEditingMobile(false); updateProfile(); }} className="custom-edit-button">Save</button>
              </div>
            ) : (
              <div className="custom-info-display">
                <span>{mobile || 'Not Provided'}</span>
                <button onClick={() => setEditingMobile(true)} className="custom-edit-button">Edit</button>
              </div>
            )}
          </div>
        </div>

        <div className="custom-info-card custom-faq-section">
          <h2 className="custom-faq-title">FAQs</h2>
          <div className="custom-faq-list">
            <div>
              <strong>What happens when I update my email address (or mobile number)?</strong>
              <p>Your login email ID (or mobile number) changes. You'll receive all your account-related communication on your updated email or mobile number.</p>
            </div>
            <div>
              <strong>When will my account be updated with the new email address (or mobile number)?</strong>
              <p>As soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
            </div>
            <div>
              <strong>What happens to my existing account when I update my email address (or mobile number)?</strong>
              <p>Your account remains fully functional. You'll continue seeing your order history, saved info, and personal details.</p>
            </div>
            <div>
              <strong>Does my seller account get affected when I update my email address?</strong>
              <p>If you use one, yes. It’ll reflect there too as part of single sign-on.</p>
            </div>
          </div>

          <div className="custom-faq-links">
            <a href="#" className="custom-faq-link custom-delete">Delete Account</a>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
