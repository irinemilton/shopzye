import React, { createContext, useState, useEffect } from 'react';
import {
  getCartItems,
  addToCart as apiAddToCart,
  updateCartItem,
  removeFromCart as apiRemoveFromCart,
} from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load cart from backend
  const loadCartItems = async () => {
    setLoading(true);
  
    try {
      const token = localStorage.getItem('accessToken'); // 🛠️ Standardize token key name
      if (!token) {
        console.warn('⚠️ No access token found. Skipping cart load.');
        setCartItems([]);
        return;
      }
  
      const response = await getCartItems();
      console.log('🛒 Loaded cart items:', response.data); // ✅ Log fetched cart items
      setCartItems(response.data);
    } catch (error) {
      console.error(
        '❌ Error loading cart items:',
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    loadCartItems();
  }, []);

  // ✅ Add to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      await apiAddToCart(productId, quantity);
      await loadCartItems();
    } catch (error) {
      console.error('🛒 Error adding to cart:', error.response?.data || error.message);
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      await updateCartItem(cartItemId, newQuantity);
      await loadCartItems();
    } catch (error) {
      console.error('🛒 Error updating cart item quantity:', error.response?.data || error.message);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (cartItemId) => {
    try {
      await apiRemoveFromCart(cartItemId);
      await loadCartItems();
    } catch (error) {
      console.error('🛒 Error removing cart item:', error.response?.data || error.message);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        console.warn('⚠️ Not logged in, cannot clear cart');
        return;
      }
      await fetch(`http://127.0.0.1:8000/api/cart/clear/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await loadCartItems();
    } catch (error) {
      console.error('🛒 Error clearing cart:', error);
    }
  };

  // 🧠 Total price calculator
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        loading,
        fetchCartItems: loadCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
