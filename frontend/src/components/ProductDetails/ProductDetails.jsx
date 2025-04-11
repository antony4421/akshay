import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./product-details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    // Fetch current product
    axios.get(`http://localhost:8005/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        fetchRelatedProducts(res.data.category);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Product not found");
      });
  }, [id]);

  const fetchRelatedProducts = (category) => {
    axios.get(`http://localhost:8005/api/products?category=${category}`)
      .then((res) => {
        setRelatedProducts(res.data.filter(p => p.id !== parseInt(id))); // exclude current product
      })
      .catch((err) => console.error("Failed to fetch related products:", err));
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = async () => {
    if (!employeeId) return toast.error("Please log in to add items to cart.");
    if (quantity < 1) return toast.warn("Quantity must be at least 1");

    setLoading(true);
    try {
      await axios.post("http://localhost:8005/api/cart", {
        employeeId,
        productId: product.id,
        quantity,
      });
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Cart add error:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!employeeId) return toast.error("Please log in to add to wishlist.");
    try {
      await axios.post("http://localhost:8005/api/wishlist", {
        employeeId,
        productId: product.id,
      });
      toast.success("Product added to wishlist!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist.");
    }
  };

  if (!product) return <div className="custom-loader">Loading product...</div>;

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img
              src={product.image1}
              alt={product.name}
              onError={(e) => (e.target.src = "/fallback-image.png")}
              className="product-image"
            />
          </Col>
          <Col md={6}>
            <h2>{product.name}</h2>
            <div className="rate">
              <div className="stars">{'⭐'.repeat(Math.round(product.rating))}</div>
              <span>{product.rating} rating</span>
            </div>
            <div className="info">
              <span className="price">₹{product.price}</span>
              <span>Category: {product.category}</span>
            </div>
            <p>{product.description}</p>
            <p className="specs">{product.specification}</p>
            <input
              className="qty-input"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <div className="action-buttons">
              <button onClick={handleAddToCart} disabled={loading}>
                {loading ? "Adding..." : "🛒 Add To Cart"}
              </button>
              <button onClick={handleAddToWishlist}>💖 Add to Wishlist</button>
            </div>
          </Col>
        </Row>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <Row className="mt-5">
            <h4>Related Products</h4>
            {relatedProducts.map((item) => (
              <Col key={item.id} md={3} className="related-product-card">
                <div
                  className="related-card"
                  onClick={() => window.location.href = `/products/${item.id}`}
                >
                  <img src={item.image1} alt={item.name} />
                  <h6>{item.name}</h6>
                  <p>₹{item.price}</p>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default ProductDetails;
