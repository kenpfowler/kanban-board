import React, { useReducer, useContext } from 'react';
import initialData from './initial-data';

const KanbanBoardContext = React.createContext();
const KanbanBoardUpdateContext = React.createContext();

const ACTIONS = {
  ADD_COLUMN: 'ADD_COLUMN',
  ADD_ITEM: 'ADD_ITEM',
};

export const useKanbanBoardContext = () => {
  return useContext(KanbanBoardContext);
};

export const useKanbanBoardUpdateContext = () => {
  return useContext(KanbanBoardUpdateContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_COLUMN:
      const columnIdNumber = state.columnOrder.push(
        `column-${state.columnOrder.length + 1}`
      );
      const columnId = `column-${columnIdNumber}`;

      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: { id: columnId, title: action.payload, itemIds: [] },
        },
      };
    default:
      return state;
  }
};

export const KanbanBoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const addColumn = (payload) => {
    console.log(`Dispached ${ACTIONS.ADD_COLUMN}!`);
    dispatch({ type: ACTIONS.ADD_COLUMN, payload: payload });
  };

  const addItem = (payload) => {
    console.log(`Dispached ${ACTIONS.ADD_ITEM}!`);
    dispatch();
    //add an item with the correct key, id, and content to the state
    //add the item to the correct column in the state
  };

  const dispatchFunctions = {
    addColumn: addColumn,
    addItem: addItem,
  };

  return (
    <KanbanBoardContext.Provider value={state}>
      <KanbanBoardUpdateContext.Provider value={dispatchFunctions}>
        {children}
      </KanbanBoardUpdateContext.Provider>
    </KanbanBoardContext.Provider>
  );
};
