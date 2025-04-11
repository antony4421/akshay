import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/CategoryManager.css';
import Sidebar from './components/sidebar/sidebar';

const CategoryManager = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8005/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = { name, image };

    try {
      if (editMode) {
        await axios.put(`http://localhost:8005/api/categories/${editId}`, category);
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:8005/api/categories", category);
      }

      setName("");
      setImage("");
      fetchCategories();
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleEdit = (cat) => {
    setEditMode(true);
    setEditId(cat.id);
    setName(cat.name);
    setImage(cat.image);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setName("");
    setImage("");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
    <div className="category-manager-container">
      <div className="add-category-form">
        <h2>{editMode ? "Edit Category" : "Add New Category"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <button type="submit">{editMode ? "Update Category" : "Add Category"}</button>
          {editMode && (
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="category-card-section">
        <h2>All Categories</h2>
        <div className="category-card-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <img src={cat.image} alt={cat.name} />
              <h3>{cat.name}</h3>
              <button onClick={() => handleEdit(cat)} className="edit-btn">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CategoryManager;
