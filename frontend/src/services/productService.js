// src/services/productService.js
import api from './api'; // Axios instance with baseURL: 'http://localhost:8000/api/'

/**
 * 📦 Product API Service
 * Handles all product-related API calls.
 */

export const getAllProducts = () => api.get('products/');
export const getProductById = (id) => api.get(`products/${id}/`);
export const createProduct = (product) => api.post('products/', product);
export const updateProduct = (id, product) => api.put(`products/${id}/`, product);
export const deleteProduct = (id) => api.delete(`products/${id}/`);
export const getCartItems = () => api.get('/cart/');