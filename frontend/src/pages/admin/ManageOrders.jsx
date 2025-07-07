import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('orders/')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>All Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>User:</strong> {order.user_email}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <Link to={`/admin/order/${order.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
