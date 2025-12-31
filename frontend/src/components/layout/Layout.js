import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="container" style={{ marginTop: '80px', paddingBottom: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;