import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center" style={{ padding: '80px 20px' }}>
      <h1 className="futuristic-heading" style={{ fontSize: '4rem' }}>
        404
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', marginTop: '20px' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <button className="futuristic-btn" style={{ marginTop: '30px' }}>
          🚀 Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
