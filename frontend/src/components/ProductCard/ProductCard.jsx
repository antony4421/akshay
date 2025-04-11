import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productItem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${productItem.id}`);
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa fa-star${i <= rating ? "" : "-o"}`}
          style={{ color: "#f3c614" }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      <img
        loading="lazy"
        onClick={handleClick}
        src={productItem.image1}
        alt={productItem.name}
        className="product-image"
      />
      <div className="product-details">
        <h3 onClick={handleClick}>{productItem.name}</h3>
        <div className="rate">{renderRating(productItem.rating)}</div>
        <div className="price">
          <h4>${productItem.price}</h4>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
