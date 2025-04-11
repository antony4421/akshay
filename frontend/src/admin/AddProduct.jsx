import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AddProduct.css";
import Sidebar from './components/sidebar/sidebar';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    image1: "",
    image2: "",
    rating: "",
    price: "",
    specification: "",
    description: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8005/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8005/api/products", product);
      alert("Product added successfully!");
      setProduct({
        name: "",
        image1: "",
        image2: "",
        rating: "",
        price: "",
        specification: "",
        description: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
    <div className="custom-add-container">
      
      <h2 className="custom-title">Add New Product</h2>
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="custom-field">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="custom-input"
            required
          />
        </div>
        <div className="custom-field">
          <input
            type="text"
            name="image1"
            placeholder="Image 1 URL"
            value={product.image1}
            onChange={handleChange}
            className="custom-input"
            required
          />
        </div>
        <div className="custom-field">
          <input
            type="text"
            name="image2"
            placeholder="Image 2 URL"
            value={product.image2}
            onChange={handleChange}
            className="custom-input"
            required
          />
        </div>
        <div className="custom-field">
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={product.rating}
            onChange={handleChange}
            className="custom-input"
            required
          />
        </div>
        <div className="custom-field">
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="custom-input"
            required
          />
        </div>
        <div className="custom-field">
          <textarea
            name="specification"
            placeholder="Specification"
            value={product.specification}
            onChange={handleChange}
            className="custom-textarea"
            required
          />
        </div>
        <div className="custom-field">
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="custom-textarea"
            required
          />
        </div>
        <div className="custom-field">
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="custom-select"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="custom-field">
          <button
            type="submit"
            className="custom-submit-button"
          >
            🚀 Add Product
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddProduct;
