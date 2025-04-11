import { Col, Container, Row, Spinner } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useWindowScrollToTop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:8005/api/products"),
          axios.get("http://localhost:8005/api/categories"),
        ]);
        setAllProducts(productsRes.data);
        setFilterList(productsRes.data); // default view: show all products
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
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
        </Container>

        <Container>
          {loading ? (
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
