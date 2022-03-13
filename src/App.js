import './App.css';
import React, { useState, useCallback } from 'react';
import Column from './components/column/column.component';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  useKanbanBoardContext,
  useKanbanBoardUpdateContext,
} from './KanbanBoardContext';
import ReactIcon from './icons/react.icon';
function App() {
  const [title, setTitle] = useState('');
  const state = useKanbanBoardContext();
  const { addColumn, moveItem } = useKanbanBoardUpdateContext();
  // using useCallback is optional
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      // the only one that is required
      const { destination, source } = result;
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      moveItem(result);
    },
    [moveItem]
  );

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <div className="container">
        <header>
          <div className="header__logo-container">
            <ReactIcon />
            <h1>Kanban Board</h1>
          </div>
          <div>
            <div className="column__input">
              <input
                type="text"
                placeholder="Give your board a title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <button
                className="btn button-secondary"
                onClick={() => {
                  if (!title) {
                    return;
                  }
                  addColumn(title);
                  setTitle('');
                }}
              >
                Create New List
              </button>
            </div>
          </div>
        </header>
        <div className="kanban__board">
          {state.columnOrder.map((column) => {
            return (
              <Column
                key={state.columns[column].id}
                columnId={state.columns[column].id}
                title={state.columns[column].title}
                itemIds={state.columns[column].itemIds}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
