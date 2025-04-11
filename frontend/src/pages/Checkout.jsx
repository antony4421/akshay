
import React, {Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/checkout.css";

import Banner from "../components/Banner/Banner";

export default function Billing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], products = {}, totalPrice = 0 } = location.state || {};

  const employeeId = localStorage.getItem("employeeId");
  const deliveryCharge = 50;
  const grandTotal = totalPrice + deliveryCharge;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_3VgjumYvXnvd0w", // Replace with your Razorpay key
      amount: grandTotal * 100,
      currency: "INR",
      name: "HRMS Store",
      description: "Order Payment",
      handler: async function () {
        try {
          const shippingAddress = "Employee Office Address";
          const status = "Pending";
          const purchaseDate = new Date();

          for (let item of cartItems) {
            const product = products[item.productId];
            if (!product) continue;

            await axios.post("http://localhost:8005/api/purchases", {
              employeeId,
              productId: item.productId,
              quantity: item.quantity,
              totalPrice: product.price * item.quantity,
              shippingAddress,
              status,
              purchaseDate
            });

            await axios.delete(`http://localhost:8005/api/cart/${item.id}/employee/${employeeId}`);
          }

          alert("Payment Successful! Order placed.");
          navigate("/myorder");
        } catch (err) {
          console.error("Error saving purchase:", err);
          alert("Purchase failed! Please try again.");
        }
      },
      prefill: {
        name: "Employee",
        email: "employee@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#0a66c2"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Fragment>
      <Banner title="Checkout" />
    <div className="checkout-page">
      <div className="checkout-main">
        <h1 className="checkout-title">Billing Details</h1>

        {cartItems.map(({ id, productId, quantity }) => {
          const product = products[productId];
          return product ? (
            <div key={id} className="checkout-product-card">
              <h3>{product.name} x {quantity}</h3>
              <p>₹{(product.price * quantity).toFixed(2)}</p>
            </div>
          ) : null;
        })}

        <div className="checkout-summary">
          <p>Items Total: ₹{totalPrice.toFixed(2)}</p>
          <p>Delivery Charge: ₹{deliveryCharge}</p>
          <p><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></p>
          <p>Expected Delivery: {deliveryDate.toDateString()}</p>
          <button className="checkout-pay-btn" onClick={handlePayment}>
            Proceed to Pay
          </button>
          <button className="checkout-back-btn" onClick={() => navigate(-1)}>
            Back to Cart
          </button>
        </div>
      </div>
    </div>
     </Fragment>
  );
}
