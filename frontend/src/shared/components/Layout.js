import React from 'react';
import Navbar from './Navbar.js';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
        <div className='app-content m-3 mt-5'>
            {children}
        </div>
    </div>
  );
}

export default Layout;