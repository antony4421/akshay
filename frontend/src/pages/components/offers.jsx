// src/components/DiscountCategorySection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DiscountCategorySection.css";

const Offers = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8005/api/offers")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  return (
    <div className="category-wrapper" style={{ backgroundColor: "#f6f9fc", padding: "2rem" }}>
      <h2 className="category-title">offers</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <img  src={cat.image} alt={cat.productName} />
              <h3 >{cat.productName}</h3>
              <p >₹{cat.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
