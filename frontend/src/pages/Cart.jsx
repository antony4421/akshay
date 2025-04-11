import React, {Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/CustomCart.css";
import Banner from "../components/Banner/Banner";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState({});
  const employeeId = localStorage.getItem("employeeId");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (employeeId) {
      axios
        .get(`http://localhost:8005/api/cart/${employeeId}`)
        .then(async (res) => {
          const cartData = res.data;
          setCartList(cartData);

          const productRequests = cartData.map(item =>
            axios.get(`http://localhost:8005/api/products/${item.productId}`)
          );

          const productResponses = await Promise.all(productRequests);
          const productMap = {};
          productResponses.forEach(response => {
            const product = response.data;
            productMap[product.id] = product;
          });

          setProducts(productMap);
        })
        .catch((err) => console.error("Error fetching cart items:", err));
    }
  }, [employeeId]);

  const handleQuantityChange = (productId, change) => {
    setCartList(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );

    axios
      .put(`http://localhost:8005/api/cart/${employeeId}/${productId}`, {
        quantityChange: change,
      })
      .catch(err => console.error("Error updating quantity:", err));
  };

  const handleRemove = (cartId) => {
    axios
      .delete(`http://localhost:8005/api/cart/${cartId}/employee/${employeeId}`)
      .then(() => {
        setCartList(prev => prev.filter(item => item.id !== cartId));
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const totalPrice = cartList.reduce((total, item) => {
    const product = products[item.productId];
    return product ? total + product.price * item.quantity : total;
  }, 0);

  return (
    <Fragment>
      <Banner title="my cart" />
    <section className="cart-items">
      
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No items in your cart</h1>
            )}
            {cartList.map((item) => {
              const product = products[item.productId];
              if (!product) return null;
              const productQty = product.price * item.quantity;

              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={product.image1} alt={product.name} />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{product.name}</h3>
                          <h4>
                            ₹{product.price}.00 × {item.quantity}
                            <span> ₹{productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => handleQuantityChange(product.id, 1)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => handleQuantityChange(product.id, -1)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => handleRemove(item.id)}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price :</h4>
                <h3>₹{totalPrice.toFixed(2)}</h3>
              </div>
              <button
                className="custom-dark-checkout-btn"
                onClick={() => navigate("/checkout", {
                  state: { cartItems: cartList, products, totalPrice }
                })}
              >
                Proceed to Checkout
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </Fragment>
  );
};

export default Cart;
