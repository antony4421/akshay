import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box'>
              <div className="logo">
                  <ion-icon name="bag"></ion-icon>
                  <h1>SHOPO</h1>
              </div>
              <p>Discover a world of premium shopping experiences with SHOPO. From top-quality products to unbeatable deals, we bring you the best in online shopping. Shop with confidence and enjoy seamless customer service at every step.</p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>About Us</h2>
              <ul>
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Customer Care</h2>
              <ul>
                <li>Help Center </li>
                <li>How to Buy </li>
                <li>Track Your Order </li>
                <li>Corporate & Bulk Purchasing </li>
                <li>Returns & Refunds </li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Contact Us</h2>
              <ul>
                <li>📍 24 Market Street, Koramangala,
Bangalore, Karnataka 560034, India </li>
                <li>📧 Email: support@shopo.com</li>
                <li>Phone:+91 8590685088</li>
              </ul>
            </Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
