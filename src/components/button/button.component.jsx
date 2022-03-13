import React from 'react';
import './button.styles.css';

const Button = (children, fn) => {
  return (
    <button className="btn-primary" onClick={fn}>
      {children}
    </button>
  );
};

export default Button;
