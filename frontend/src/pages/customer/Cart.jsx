import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { removeFromCart } from '../../services/cartService';

const Cart = () => {
  const { cartItems, setCartItems, updateQuantity, loading, fetchCartItems } = useContext(CartContext);
  const [localLoading, setLocalLoading] = useState(false);

  const getImageUrl = (image) =>
    image?.startsWith('http') ? image : `http://127.0.0.1:8000${image}`;

  const handleRemoveCartItem = async (cartItemId) => {
    try {
      setLocalLoading(true);
      await removeFromCart(cartItemId);
      await fetchCartItems();
    } catch (error) {
      console.error('❌ Delete error:', error.response?.data || error.message);
    } finally {
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      fetchCartItems(); // load only if user is authenticated
    } else {
      console.warn('⚠️ No access token found, skipping cart fetch.');
    }
  }, []);

  if (loading || localLoading) {
    return (
      <div className="container text-center" style={{ padding: '60px 20px' }}>
        <h2 className="futuristic-heading mb-4">Loading cart...</h2>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #00ffcc',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container text-center" style={{ padding: '60px 20px' }}>
        <h2 className="futuristic-heading mb-4">Your cart is empty 🛒</h2>
        <Link to="/products">
          <button className="futuristic-btn">Go Shopping</button>
        </Link>
      </div>
    );
  }

  const validCartItems = cartItems.filter(item => item.product);
  const totalPrice = validCartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (validCartItems.length === 0) {
    return (
      <div className="container text-center" style={{ padding: '60px 20px' }}>
        <h2 className="futuristic-heading mb-4">Your cart is empty 🛒</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          Some items were removed because the products are no longer available.
        </p>
        <Link to="/products">
          <button className="futuristic-btn">Go Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
      <h2 className="futuristic-heading text-center mb-6">🛒 Shopping Cart</h2>

      {validCartItems.map((item) => (
        <div
          key={item.id}
          className="futuristic-card"
          style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}
        >
          <img
            src={getImageUrl(item.product.image)}
            alt={item.product.name || 'Product'}
            width="80"
            height="80"
            style={{ borderRadius: '10px', objectFit: 'cover' }}
          />

          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>
              {item.product.name}
            </h4>
            <p style={{ color: 'var(--text-muted)' }}>
              ₹{item.product.price} × {item.quantity}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="futuristic-btn"
                style={{ padding: '5px 10px', fontSize: '0.9rem' }}
              >
                -
              </button>
              <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="futuristic-btn"
                style={{ padding: '5px 10px', fontSize: '0.9rem' }}
              >
                +
              </button>
              <button
                onClick={() => handleRemoveCartItem(item.id)}
                className="futuristic-btn"
                style={{ marginLeft: '10px', backgroundColor: '#ff4d4d' }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ color: 'var(--primary)', textAlign: 'right', marginTop: '30px' }}>
        Total: ₹{totalPrice}
      </h3>

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Link to="/checkout">
          <button className="futuristic-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
