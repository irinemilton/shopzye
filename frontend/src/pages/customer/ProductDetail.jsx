import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { CartContext } from '../../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (err) {
      console.error('❌ Product detail error:', err);
      setError('Failed to load product details');
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!product) return <p className="text-center">Loading...</p>;

  const imageUrl = product?.image?.startsWith('http')
    ? product.image
    : `http://127.0.0.1:8000${product.image}`;

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '900px', margin: 'auto' }}>
      <div className="futuristic-card" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            width: '300px',
            borderRadius: '12px',
            boxShadow: '0 0 12px var(--primary)',
            objectFit: 'cover',
          }}
        />

        <div style={{ flex: 1 }}>
          <h2 className="futuristic-heading">{product.name}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>₹{product.price}</p>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>{product.description}</p>

          <button className="futuristic-btn" onClick={handleAddToCart} style={{ marginTop: '20px' }}>
            Add to Cart
          </button>

          {added && (
            <p style={{
              color: '#00ffcc',
              marginTop: '10px',
              fontWeight: 'bold',
              textShadow: '0 0 8px #00ffff',
              animation: 'fadeInOut 1.5s ease',
            }}>
              ✅ Added to cart!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
