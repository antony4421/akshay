import { Col, Container, Row, Spinner } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract category from URL
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = decodeURIComponent(queryParams.get("category") || "");

  useWindowScrollToTop();

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:8005/api/products"),
          axios.get("http://localhost:8005/api/categories"),
        ]);

        const products = productsRes.data;
        setAllProducts(products);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (!selectedCategory) {
      setFilterList(allProducts);
    } else {
      const filtered = allProducts.filter(
        (item) =>
          item.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      );
      setFilterList(filtered);
    }
  }, [selectedCategory, allProducts]);

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-container">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect
                allProducts={allProducts}
                categories={categories}
                setFilterList={setFilterList}
              />
            </Col>
            <Col md={8}>
              <SearchBar
                allProducts={allProducts}
                setFilterList={setFilterList}
              />
            </Col>
          </Row>

          {error ? (
            <div className="text-center text-danger my-5">
              <p>{error}</p>
            </div>
          ) : loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p>Loading products...</p>
            </div>
          ) : (
            <ShopList productItems={filterList} />
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
