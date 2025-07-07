import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // ✅ Centralized API instance

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/mine');
      setOrders(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch orders:', err);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '900px', margin: 'auto' }}>
      <h2 className="futuristic-heading text-center">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="futuristic-empty">🕳️ No orders placed yet.</p>
      ) : (
        <div className="futuristic-orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="futuristic-card">
              <div className="order-header">
                <span>🆔 Order <strong>#{order.id}</strong> </span>
                <span>{new Date(order.created_at).toLocaleString()}</span>
              </div>

              <p>
                <strong>📍 Address:</strong> {order.shipping_address || 'N/A'}
              </p>

              <p>
                <strong>✅ Paid:</strong>{' '}
                <span style={{ color: order.is_paid ? 'lime' : 'orange' }}>
                  {order.is_paid ? 'Yes' : 'No'}
                </span>
              </p>

              <p>
                <strong>🛍️ Items:</strong>
              </p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                  {item.product_name}   × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="order-footer">
                <strong>Total: ₹{order.total_price}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
