import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="futuristic-footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '10px'
          }}
        >
          <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>⚡ Shopzye</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
            Shopzye is your futuristic one-stop marketplace for premium products and lightning-fast delivery.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/cart" className="footer-link">Cart</Link>
            <Link to="/login" className="footer-link">Login</Link>
          </div>
        </div>
        <hr style={{ borderColor: 'var(--primary)', margin: '25px 0' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
          © {new Date().getFullYear()} Shopzye. Built with 💡 and ⚙️ by Irine Milton.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
