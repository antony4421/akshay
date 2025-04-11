import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DiscountCategorySection.css";

const DiscountCategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8005/api/categories")
      .then((response) => {
        setCategories(response.data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      });
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="category-wrapper" style={{ backgroundColor: "#f6f9fc", padding: "2rem" }}>
      <h2 className="category-title">Shop by Category</h2>
      <div className="category-grid">
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
              style={{ cursor: "pointer" }}
            >
              <img src={category.image} alt={category.name} className="category-image" />
              <h4 className="category-name">{category.name}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiscountCategorySection;
