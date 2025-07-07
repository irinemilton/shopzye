import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import AddEditProduct from '../pages/admin/AddEditProduct';
import ManageOrders from '../pages/admin/ManageOrders';
import ViewOrder from '../pages/admin/ViewOrder';
import AdminSettings from '../pages/admin/AdminSettings';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<ManageProducts />} />
      <Route path="/admin/product/:id?" element={<AddEditProduct />} />
      <Route path="/admin/orders" element={<ManageOrders />} />
      <Route path="/admin/order/:id" element={<ViewOrder />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
};

export default AdminRoutes;
