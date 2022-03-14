import React from 'react';
import './item.styles.css';
import DeleteLogo from './trash.svg';

import { Draggable } from 'react-beautiful-dnd';

const Item = ({ index, content, itemId, columnId, removeItem }) => {
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
            {content}

            <div
              onClick={() => {
                removeItem({ column_id: columnId, itemId: itemId });
              }}
            >
              <img
                src={DeleteLogo}
                alt="trashcan"
                className="column__item-handle"
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
