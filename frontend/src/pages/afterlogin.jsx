import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import NavBar from "./components/Navbar/Navbar";
import DiscountCategorySection from "./components/DiscountCategorySection";
import Offers from "./components/offers";
const AfterLogin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8005/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useWindowScrollToTop();

  // Top 8 by rating
  const newArrivalData = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const bestSales = products.filter((item) => item.category === "sofa ");

  return (
    <Fragment>
      <NavBar />
      <SliderHome />
      <Wrapper />
      <DiscountCategorySection />
      <Offers/>
    </Fragment>
  );
};

export default AfterLogin;
