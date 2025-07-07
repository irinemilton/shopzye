import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`orders/${id}/`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Order #{order.id}</h2>
      <p><strong>User:</strong> {order.user_email}</p>
      <p><strong>Total:</strong> ₹{order.total}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <h4>Items:</h4>
      <ul>
        {order.items.map((item, idx) => (
          <li key={idx}>{item.name} × {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrder;
