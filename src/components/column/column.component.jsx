import React, { useState } from 'react';
import './column.styles.css';
import Item from '../item/item.component';
import { Droppable } from 'react-beautiful-dnd';
import {
  useKanbanBoardContext,
  useKanbanBoardUpdateContext,
} from '../../KanbanBoardContext';

const Column = ({ title, itemIds, columnId }) => {
  const state = useKanbanBoardContext();
  const { addItem } = useKanbanBoardUpdateContext();
  const [input, setInput] = useState('');

  return (
    <div className="column">
      <h1 className="column__title">{title}</h1>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="column__container"
          >
            {itemIds.map((itemId, index) => {
              return (
                <Item
                  key={itemId}
                  index={index}
                  content={state.items[itemId].content}
                  columnId={columnId}
                  itemId={state.items[itemId].id}
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
  );
};

export default Column;
