import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CustomerRoutes from './routes/CustomerRoutes';
import AdminRoutes from './routes/AdminRoutes';
import NotFound from './pages/NotFound';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Layout from './components/Layout';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            {/* ✅ Main customer-facing routes */}
            <Route path="/*" element={<CustomerRoutes />} />
            

            {/* ✅ Admin-only routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* 🚫 Catch-all fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
