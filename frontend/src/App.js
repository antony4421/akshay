import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import RegisterPage from "./pages/RegisterPage";
import Afetrlogin from "./pages/afterlogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/login";
import NavBar from "./components/Navbar/Navbar";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));


function AppWrapper() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Show NavBar only on Home route */}
      {isHome && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/afterlogin" element={<Afetrlogin />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <AppWrapper />
      </Router>
    </Suspense>
  );
}

export default App;
