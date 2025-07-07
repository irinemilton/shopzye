import api from './api';

// 🔐 Helper to include auth header
const authHeader = () => {
  const token = localStorage.getItem('access');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ GET all cart items
export const getCartItems = () => {
  return api.get('/cart/', { headers: authHeader() });
};

// ✅ POST to add item
export const addToCart = (productId, quantity = 1) => {
  return api.post('/cart/', { product_id: productId, quantity }, { headers: authHeader() });
};

// ✅ PUT to update quantity
export const updateCartItem = (cartItemId, quantity) => {
  return api.put('/cart/', { cart_item_id: cartItemId, quantity }, { headers: authHeader() });
};

// ✅ DELETE to remove from cart
export const removeFromCart = (cartItemId) => {
  return api.delete('/cart/', {
    headers: authHeader(),
    data: { cart_item_id: cartItemId },
  });
};
