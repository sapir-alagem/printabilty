import React from 'react';
import NavigationBar from './NavigationBar.js';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <NavigationBar />
        <div className='app-content m-3 mt-5'>
            {children}
        </div>
    </div>
  );
}

export default Layout;