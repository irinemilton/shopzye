// 📁 src/components/ProductCard.jsx

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart(product.id);  // Pass only the product ID for backend
  };

  const getImageUrl = (img) =>
    img?.startsWith('http') ? img : `http://localhost:8000${img}`;

  return (
    <div className="futuristic-card" style={{ padding: '15px', borderRadius: '10px' }}>
      <img
        src={getImageUrl(product.image)}
        alt={product.name}
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h4 style={{ marginTop: '10px', color: 'var(--primary)' }}>{product.name}</h4>
      <p style={{ fontWeight: 'bold' }}>₹{product.price}</p>
      <button className="futuristic-btn" onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
