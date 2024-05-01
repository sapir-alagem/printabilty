import React from 'react';
import logoImg from './public/logo.png';

function App() {
  return (
    <div className="App">
      <button className="logo-button" onClick={handleClick}>
        <img src={logoImg} alt="App Logo" />
      </button>
    </div>
  );
}

function handleClick() {
    
  // Handle click event if needed
}

export default App;
