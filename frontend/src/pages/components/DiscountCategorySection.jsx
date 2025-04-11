// src/components/DiscountCategorySection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DiscountCategorySection.css";

const DiscountCategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8005/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  return (
    <div className="category-wrapper" style={{ backgroundColor: "#f6f9fc", padding: "2rem" }}>
      <h2 className="category-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
             <img src={cat.image} alt={cat.name} />
            <h4>{cat.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountCategorySection;
