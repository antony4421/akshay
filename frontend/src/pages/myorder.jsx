import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/myorder.css";
import Banner from "../components/Banner/Banner";

export default function OrderDetails() {
  const [purchases, setPurchases] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const employeeId = localStorage.getItem("employeeId");
  const navigate = useNavigate();

  useEffect(() => {
    if (employeeId) {
      axios.get(`http://localhost:8005/api/purchases/employee/${employeeId}`)
        .then(response => {
          setPurchases(response.data);
          fetchProductDetails(response.data);
        })
        .catch(error => {
          console.error("Error fetching purchases:", error);
        });
    }
  }, [employeeId]);

  const fetchProductDetails = async (purchaseList) => {
    const details = {};
    for (let purchase of purchaseList) {
      const { productId } = purchase;
      if (!details[productId]) {
        try {
          const res = await axios.get(`http://localhost:8005/api/products/${productId}`);
          details[productId] = res.data;
        } catch (err) {
          console.error(`Error fetching product ${productId}:`, err);
        }
      }
    }
    setProductDetails(details);
  };

  return (
    <Fragment>
          <Banner title="product" />
    <div className="custom-dark-cart-page">
      <div className="custom-dark-cart-main">
        <h1 className="custom-dark-cart-title">My Orders</h1>

        {purchases.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          purchases.map((order) => {
            const product = productDetails[order.productId];
            return (
              <div key={order.id} className="custom-dark-cart-card">
                {product?.image1 && (
                  <img
                    src={product.image1}
                    alt={product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      objectFit: "cover"
                    }}
                  />
                )}
                <h3>{product?.name || "Product Name"} x {order.quantity}</h3>
                <p>Total Amount: ₹{order.totalAmount}</p>
                <p>Status: {order.status}</p>
                <p>Shipping Address: {order.shippingAddress}</p>
                <p>Order Date: {new Date(order.purchaseDate).toLocaleString()}</p>
              </div>
            );
          })
        )}

        
      </div>
    </div>
    </Fragment>
  );
}
