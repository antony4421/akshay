import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/OfferManager.css";
import Sidebar from './components/sidebar/sidebar';
const OfferManager = () => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName: "", price: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchOffers();
    fetchProducts();
  }, []);

  const fetchOffers = async () => {
    const res = await axios.get("http://localhost:8005/api/offers");
    setOffers(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8005/api/products");
    setProducts(res.data);
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const product = products.find((p) => p.id === parseInt(selectedProductId));
    if (product) {
      setForm({
        productName: product.name,
        price: product.price,
        image: product.image1,
      });
    } else {
      setForm({ productName: "", price: "", image: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productName) return;

    if (editingId) {
      await axios.put(`http://localhost:8005/api/offers/${editingId}`, form);
    } else {
      await axios.post("http://localhost:8005/api/offers", form);
    }

    setForm({ productName: "", price: "", image: "" });
    setEditingId(null);
    fetchOffers();
  };

  const handleEdit = (offer) => {
    setForm(offer);
    setEditingId(offer.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8005/api/offers/${id}`);
    fetchOffers();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
    <div className="offer-page">
      <div className="offer-form">
        <h2>{editingId ? "Edit Offer" : "Add Offer"}</h2>
        <form onSubmit={handleSubmit}>
          <select onChange={handleProductSelect} required disabled={!!editingId}>
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="productName"
            value={form.productName}
            readOnly
            placeholder="Product Name"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            readOnly={!editingId}
            required
          />

          <input
            type="text"
            name="image"
            value={form.image}
            readOnly
            placeholder="Image URL"
          />

          <button type="submit" disabled={!form.productName}>
            {editingId ? "Update" : "Add Offer"}
          </button>
        </form>
      </div>

      <div className="offer-cards">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offer.image} alt={offer.productName} />
            <h3>{offer.productName}</h3>
            <p>Price: ₹{offer.price}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(offer)}>Edit</button>
              <button onClick={() => handleDelete(offer.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};


export default OfferManager;
