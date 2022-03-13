import React from 'react';
import './item.styles.css';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({ index, content, removeItem, itemId, columnId }) => {
  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="column__item"
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
