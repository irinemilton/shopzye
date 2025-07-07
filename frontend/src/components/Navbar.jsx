import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Shopzye</Link>

      <div className="nav-links">
        <Link to="/products">Shop</Link>
        {user?.is_admin && <Link to="/admin">Admin</Link>}
        {user && <Link to="/orders">Orders</Link>}
        <Link to="/cart">Cart ({cartItems.length})</Link>

        {user ? (
          <>
            {/* ✅ Profile Link */}
            <Link to="/profile">My Profile</Link>

            {/* Greeting */}
            <span>Hello, {user.name}</span>

            {/* Logout Button */}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
