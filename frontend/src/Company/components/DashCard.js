import React from 'react';


const DashCard = ({ children }) => {
      
  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid #ddd',
    borderRadius: '15px',
    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
  };
  
  return (
    <div className="card flex-fill" style={cardStyle}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default DashCard;
