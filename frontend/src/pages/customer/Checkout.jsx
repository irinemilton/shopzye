import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert('📦 Please enter a shipping address.');
      return;
    }

    if (cartItems.length === 0) {
      alert('🛒 Your cart is empty.');
      return;
    }

    const orderItems = cartItems.map(item => ({
      product: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const orderData = {
      items: orderItems,
      total_price: calculateTotal(),
      shipping_address: address,
    };

    try {
      await api.post('orders/', orderData);

      clearCart();
      alert('✅ Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error('Order error:', err);
      alert('❌ Something went wrong while placing the order.');
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 className="futuristic-heading text-center">🧾 Checkout</h2>

      <div className="futuristic-card" style={{ marginTop: '30px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Order Summary</h3>

        {cartItems.length === 0 ? (
          <p style={{ color: 'gray', fontStyle: 'italic' }}>🛒 Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: '12px', color: 'var(--text-light)' }}>
              🛍️ <strong>{item.product?.name || 'Unnamed Product'}</strong> × {item.quantity} = ₹
              {(item.product?.price || 0) * item.quantity}
            </div>
          ))
        )}

        <h4 style={{ textAlign: 'right', marginTop: '20px', color: 'var(--primary)' }}>
          Total: ₹{calculateTotal()}
        </h4>
      </div>

      <div className="futuristic-card" style={{ marginTop: '30px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Shipping Address</h3>

        <textarea
          className="futuristic-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter full shipping address"
          rows={4}
          style={{ resize: 'none', height: '100px' }}
        />

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <button className="futuristic-btn" onClick={handlePlaceOrder}>
            🚀 Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
