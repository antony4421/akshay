import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';

function Allproduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/categories');
      setCategories(['All', ...response.data]); // Add 'All' as default
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8005/api/products/${productId}`);
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || product.category === categoryFilter)
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="product-list-container">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
         <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
  <option value="All">All</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}>{cat.name}</option>
  ))}
</select>

        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image1} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.category}</p>
              <p>${product.price}</p>

              <div className="card-buttons">
                <button onClick={() => navigate(`/update-product/${product.id}`)}>View</button>
                <button onClick={() => navigate(`/update-product/${product.id}`)}>Update</button>


                <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Allproduct;
