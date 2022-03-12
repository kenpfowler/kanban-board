import React, { useState } from 'react';
import './column.styles.css';

import Item from '../item/item.component';
import { useKanbanBoardContext } from '../../KanbanBoardContext';

const Column = ({ title, itemIds }) => {
  const state = useKanbanBoardContext();
  const [input, setInput] = useState('');

  return (
    <div className="column">
      <h1 className="column__title">{title}</h1>
      <div className="column__container">
        {itemIds.map((itemId) => {
          console.log(state.items[itemId]);
          return (
            <Item
              key={state.items[itemId].id}
              content={state.items[itemId].content}
            />
          );
        })}
      </div>
      <div className="column__input">
        <input
          type="text"
          placeholder="add your next task"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={() => {}}>+ Add</button>
      </div>
    </div>
  );
};

export default Column;
