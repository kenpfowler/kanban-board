import React from 'react';
import './item.styles.css';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({ index, content, itemId }) => {
  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            snapshot.isDragging
              ? 'column__item column__item-dragging'
              : 'column__item'
          }
        >
          <div className="column__item-content">
            <div className="column__item-handle"></div>
            {content}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
