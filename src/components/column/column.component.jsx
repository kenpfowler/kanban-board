import React, { useState } from 'react';
import './column.styles.css';
import Item from '../item/item.component';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  useKanbanBoardContext,
  useKanbanBoardUpdateContext,
} from '../../KanbanBoardContext';
import DeleteLogo from './trash.svg';

const Column = ({ title, itemIds, columnId, index }) => {
  const state = useKanbanBoardContext();
  const { addItem, removeItem, removeColumn } = useKanbanBoardUpdateContext();
  const [input, setInput] = useState('');

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="column"
        >
          <div
            className="column__header"
            onClick={() => {
              if (
                window.confirm('Are you sure you want to delete this list?')
              ) {
                removeColumn({ column_id: columnId });
              }
            }}
          >
            <h1 {...provided.dragHandleProps} className="column__title">
              {title}
            </h1>

            <img
              src={DeleteLogo}
              alt="trashcan"
              className="column__item-handle"
            />
          </div>

          <Droppable droppableId={columnId} type="item">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={
                  snapshot.isDraggingOver
                    ? 'column__container column__dragging'
                    : 'column__container'
                }
              >
                {itemIds.map((itemId, index) => {
                  return (
                    <Item
                      key={itemId}
                      index={index}
                      content={state.items[itemId].content}
                      columnId={columnId}
                      itemId={state.items[itemId].id}
                      removeItem={removeItem}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="column__input">
            <input
              type="text"
              placeholder="Describe your task..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!input) {
                  return;
                }
                addItem({ input: input, column_id: columnId });
                setInput('');
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
