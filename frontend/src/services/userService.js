
// 📁 src/services/cartService.js
import api from './api';

export const getCartItems = () => api.get('/cart/');

/**
 * 🔍 Fetch current authenticated user's profile
 * @returns {Promise} Axios response
 */
export const getUserProfile = () => {
  return api.get('/users/user/profile/');
};

/**
 * 🛠️ Update authenticated user's profile
 * @param {Object} data - Updated profile fields
 * @returns {Promise} Axios response
 */
export const updateUserProfile = (data) => {
  return api.put('/users/user/profile/', data);
};
