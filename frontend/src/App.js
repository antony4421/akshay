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
import Billing from "./pages/Checkout";
import Dashboard from "./admin/dashboard";
import CustomerList from "./admin/CustomerList";
import Allproduct from "./admin/allproduct";
import EditProduct from "./admin/EditProduct";
import CategoryManager from "./admin/CategoryManager";
import OfferManager from "./admin/OfferManager";
import PurchaseList from "./admin/PurchaseList";
import AddProduct from "./admin/AddProduct";
import WishlistPage from "./pages/WishlistPage";
import ProfileInfo from "./pages/profile";
import OrderDetails from "./pages/myorder";
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
        <Route path="/checkout" element={<Billing/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/offermanager" element={<OfferManager/>}/>
        <Route path="/purchaselist" element={<PurchaseList/>}/>
        <Route path="/categorymanager" element={<CategoryManager/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
       <Route path="/customers" element={<CustomerList />} />
        <Route path="/allproduct" element={<Allproduct/>}/>
        <Route path="/update-product/:id" element={<EditProduct />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/wishlist" element={<WishlistPage/>}/>
        <Route path="/profile" element={<ProfileInfo/>}/>
        <Route path="/myorder" element={<OrderDetails/>}/>
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
