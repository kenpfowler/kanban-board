import './App.css';
import React, { useState, useCallback } from 'react';
import Column from './components/column/column.component';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  useKanbanBoardContext,
  useKanbanBoardUpdateContext,
} from './KanbanBoardContext';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
function App() {
  const [title, setTitle] = useState('');
  const state = useKanbanBoardContext();
  const { addColumn, moveItem, moveColumn } = useKanbanBoardUpdateContext();
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
      const { destination, source, type } = result;
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === 'column') {
        moveColumn(result);
      } else {
        moveItem(result);
      }
    },
    [moveItem, moveColumn]
  );

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Header setTitle={setTitle} title={title} addColumn={addColumn}></Header>
      <div className="container">
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="kanban__board"
            >
              {state.columnOrder.map((column, index) => {
                return (
                  <Column
                    index={index}
                    key={state.columns[column].id}
                    columnId={state.columns[column].id}
                    title={state.columns[column].title}
                    itemIds={state.columns[column].itemIds}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <Footer />
    </DragDropContext>
  );
}

export default App;
