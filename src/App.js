import './App.css';
import React, { useState } from 'react';
import Column from './components/column/column.component';
import {
  useKanbanBoardContext,
  useKanbanBoardUpdateContext,
} from './KanbanBoardContext';

function App() {
  const [title, setTitle] = useState('');
  const state = useKanbanBoardContext();
  const { addColumn } = useKanbanBoardUpdateContext();
  console.log(state);

  return (
    <div className="container">
      <header>
        <h1>Kanban Board</h1>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addColumn(title);
              setTitle('');
            }}
          >
            Create New List
          </button>
        </div>
      </header>
      <div className="kanban__board">
        {state.columnOrder.map((column) => {
          return (
            <Column
              key={state.columns[column].id}
              title={state.columns[column].title}
              itemIds={state.columns[column].itemIds}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
