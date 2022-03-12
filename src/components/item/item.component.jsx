import React from 'react';
import './item.styles.css';

const Item = ({ id, content }) => {
  return (
    <div key={id} className="column__item">
      {content}
    </div>
  );
};

export default Item;
