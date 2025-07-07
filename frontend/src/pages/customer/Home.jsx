
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="futuristic-heading" style={{ fontSize: '3rem', marginBottom: '15px' }}>
          Welcome to Shopzye
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '25px' }}>
          Your one-stop shop for all your needs!
        </p>
        <Link to="/products">
          <button className="futuristic-btn">Shop Now</button>
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="futuristic-heading" style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>
          Why Shop With Us?
        </h2>
        <div className="features-grid" style={{ display: 'grid', gap: '25px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div className="futuristic-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary)' }}>Quality Products</h3>
            <p style={{ color: 'var(--text-muted)' }}>We offer only the best curated items just for you.</p>
          </div>
          <div className="futuristic-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary)' }}>Secure Checkout</h3>
            <p style={{ color: 'var(--text-muted)' }}>Shop confidently with our protected payment system.</p>
          </div>
          <div className="futuristic-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary)' }}>Fast Delivery</h3>
            <p style={{ color: 'var(--text-muted)' }}>Enjoy quick and hassle-free deliveries at your doorstep.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
