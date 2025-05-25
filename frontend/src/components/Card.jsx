import React from 'react';

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-base-100 rounded-xl shadow p-4 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
