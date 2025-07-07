import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    api.delete(`products/${id}/`)
      .then(() => setProducts(products.filter(p => p.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <Link to="/admin/product">Add New Product</Link>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ₹{p.price}
            <Link to={`/admin/product/${p.id}`}>✏️ Edit</Link>
            <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
