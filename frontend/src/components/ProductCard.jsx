import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [showMsg, setShowMsg] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const imageUrl = product.image
    ? (product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`)
    : 'https://via.placeholder.com/180?text=No+Image';

  const handleAddToCart = async () => {
    console.log('🛒 ProductCard: Starting add to cart for:', product.name);
    setIsAdding(true);
    try {
      await addToCart(product.id);
      console.log('🛒 ProductCard: Successfully added to cart:', product.name);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1500);
    } catch (error) {
      console.error('🛒 ProductCard: Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="futuristic-card"
      style={{
        textAlign: 'center',
        maxWidth: '240px',
        margin: 'auto',
        position: 'relative'
      }}
    >
      <img
        src={imageUrl}
        alt={product.name || 'Product'}
        width="180"
        height="180"
        style={{ borderRadius: '12px', marginBottom: '10px' }}
      />

      <h4 className="futuristic-heading" style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
        {product.name}
      </h4>

      <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>₹{product.price}</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '12px' }}>
        <Link to={`/product/${product.id}`}>
          <button className="futuristic-btn" aria-label="View product details">View</button>
        </Link>

        <button 
          className="futuristic-btn" 
          onClick={handleAddToCart} 
          disabled={isAdding}
          aria-label="Add to cart"
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>

      {showMsg && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#00ffcc',
            color: '#000',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 255, 204, 0.3)',
            animation: 'fadeInOut 1.5s ease',
            zIndex: 10
          }}
        >
          ✅ Added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
