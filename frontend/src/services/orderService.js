import api from './api';

export const placeOrder = (orderData) => api.post('orders/', orderData);
export const getUserOrders = () => api.get('orders/mine/');
export const getAllOrders = () => api.get('orders/');
export const getOrderById = (id) => api.get(`orders/${id}/`);
export const getCartItems = () => api.get('/cart/');