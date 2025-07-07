// ✅ Fix: Export route list as JSX (NOT wrapped in <Routes>)
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public & Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Customer pages
import Home from '../pages/customer/Home';
import ProductList from '../pages/customer/ProductList';
import ProductDetail from '../pages/customer/ProductDetail';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import OrderHistory from '../pages/customer/Orders';
import Profile from '../pages/customer/Profile';
import About from '../pages/shared/About';
import Contact from '../pages/shared/Contact';
import Terms from '../pages/shared/Terms';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route key="login" path="/login" element={<Login />} />
      <Route key="register" path="/register" element={<Register />} />
      <Route key="forgot-password" path="/forgot-password" element={<ForgotPassword />} />
      <Route key="reset-password" path="/reset-password" element={<ResetPassword />} />
      <Route key="reset-password-token" path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
      
      <Route key="home" path="/" element={<Home />} />
      <Route key="products" path="/products" element={<ProductList />} />
      <Route key="product-detail" path="/product/:id" element={<ProductDetail />} />
      <Route key="cart" path="/cart" element={<Cart />} />
      <Route key="checkout" path="/checkout" element={<Checkout />} />
      <Route key="orders" path="/orders" element={<OrderHistory />} />
      <Route key="profile" path="/profile" element={<Profile />} />
      <Route key="about" path="/about" element={<About />} />
      <Route key="contact" path="/contact" element={<Contact />} />
      <Route key="terms" path="/terms" element={<Terms />} />
    </Routes>
  );
};

export default CustomerRoutes;
