import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/EditProduct.css';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    image1: '',
    image2: '',
    name: '',
    rating: 0,
    price: 0,
    specification: '',
    description: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8005/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8005/api/products/${id}`, product);
      alert('Product updated successfully!');
      navigate('/allproduct');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <label>Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>Image 1 URL:</label>
        <input type="text" name="image1" value={product.image1} onChange={handleChange} />

        <label>Image 2 URL:</label>
        <input type="text" name="image2" value={product.image2} onChange={handleChange} />

        <label>Rating:</label>
        <input type="number" name="rating" value={product.rating} onChange={handleChange} step="0.1" />

        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} step="0.01" />

        <label>Category:</label>
        <select name="category" value={product.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <label>Specification:</label>
        <textarea name="specification" value={product.specification} onChange={handleChange}></textarea>

        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange}></textarea>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
