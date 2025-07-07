import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    if (id) {
      api.get(`products/${id}/`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const apiCall = id
      ? api.put(`products/${id}/`, product)
      : api.post('products/', product);

    apiCall.then(() => {
      alert(`Product ${id ? 'updated' : 'created'} successfully`);
      navigate('/admin/products');
    }).catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit' : 'Add'} Product</h2>
      <input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
      <input name="price" value={product.price} onChange={handleChange} placeholder="Price" />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
      <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
      <br />
      <button onClick={handleSubmit}>{id ? 'Update' : 'Create'} Product</button>
    </div>
  );
};

export default AddEditProduct;
