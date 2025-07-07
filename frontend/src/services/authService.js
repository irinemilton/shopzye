// src/services/authService.js

import api from './api';

/**
 * Logs in the user with given credentials.
 * @param {Object} credentials - { email, password }
 * @returns {Promise}
 */
export const loginUser = (credentials) => {
  return api.post('/users/login/', credentials);
};

/**
 * Registers a new user with provided data.
 * @param {Object} data - { email, username, password }
 * @returns {Promise}
 */
export const registerUser = (data) => {
  return api.post('register/', data);
};

/**
 * Initiates password reset process by sending reset link to user's email.
 * @param {string} email
 * @returns {Promise}
 */
export const forgotPassword = (email) => {
  return api.post('password-reset/', { email });
};

/**
 * Resets the user's password using a valid token.
 * @param {string} token - The token received via email.
 * @param {string} newPassword - The new password to be set.
 * @returns {Promise}
 */
export const resetPassword = (token, newPassword) => {
  return api.post(`password-reset/${token}/`, { password: newPassword });
};



export const getCartItems = () => api.get('/cart/');