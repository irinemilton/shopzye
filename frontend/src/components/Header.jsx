import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  console.log('🛒 Header: Cart items count:', cartItems.length);

  return (
    <header className="futuristic-header">
      <div className="header-container">
        <Link to="/" className="logo">⚡ Shopzye</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-box">Home</Link>
          <Link to="/products" className="nav-box">Products</Link>
          
          <Link to="/cart" className="nav-box" style={{ position: 'relative' }}>
            Cart 
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#00ffcc',
                color: '#000',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                animation: 'pulse 1s infinite'
              }}>
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/orders" className="nav-box"> My Orders </Link>
          
          



          {!loading && (
            <>
              {user ? (
                <>
                  <Link to="/profile" className="nav-box">👤 {user.name}</Link>
                  <button className="nav-box" onClick={logout}>🚪 Logout</button>
                </>
              ) : (
                <Link to="/login" className="nav-box">Login</Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
