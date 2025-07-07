// 📁 src/pages/customer/ProductList.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Failed to load products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="product-list-container"
      style={{
        padding: '60px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <h2 className="futuristic-heading text-center mb-4">🛍️ Shop Products</h2>

      {loading && (
        <p className="text-center text-muted" style={{ fontSize: '1.1rem' }}>
          Loading products...
        </p>
      )}

      {error && (
        <p className="text-center text-danger" style={{ fontSize: '1.1rem', color: 'red' }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p className="text-center text-muted">No products available.</p>
          ) : (
            <div
              className="product-grid"
              style={{
                display: 'grid',
                gap: '30px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
