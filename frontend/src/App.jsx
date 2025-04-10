import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './store/slices/authSlice';

// Layout
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProductDetails from './pages/Products/ProductDetails';

// Protected Pages
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderList from './pages/Orders/OrderList';
import OrderDetails from './pages/Orders/OrderDetails';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import OrderManagement from './pages/Admin/Orders/OrderManagement';
import ProductManagement from './pages/Admin/Products/ProductManagement';
import UserManagement from './pages/Admin/Users/UserManagement';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products/:productId" element={<ProductDetails />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin">
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
