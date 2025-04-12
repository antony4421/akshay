// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Optional, for custom styles

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">SHOPO</h2>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/customers">Users</Link></li>
        <li><Link to="/allproduct">Products</Link></li>
        <li><Link to="/purchaselist">Orders</Link></li>
        <li><Link to="/offermanager">Offers</Link></li>
        <li><Link to="/categorymanager">Category</Link></li>
        <li><Link to="/addproduct">Add Product</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
