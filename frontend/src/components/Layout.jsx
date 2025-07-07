// components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main className="layout-main" style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
