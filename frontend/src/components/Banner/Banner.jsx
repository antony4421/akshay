import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import productBg from "../../Images/table.jpg";
import "./banner.css";

const Banner = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="image-container">
            <img src={productBg} alt="Product-bg" className="img-fluid" />
            <div className="overlay">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ⬅ Back
                </button>
                <Container>
                    <Row>
                        <Col>
                            <h2>{title}</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Banner;
