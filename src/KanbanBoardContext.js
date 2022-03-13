import React, { useContext } from 'react';
import initialData from './initial-data';
import { reducer } from './store/reducer';
import { ACTIONS } from './store/actions';
import { useReducerWithLogger } from './hooks/useReducerWithLogger.hook.js';

const KanbanBoardContext = React.createContext();
const KanbanBoardUpdateContext = React.createContext();

export const useKanbanBoardContext = () => {
  return useContext(KanbanBoardContext);
};

export const useKanbanBoardUpdateContext = () => {
  return useContext(KanbanBoardUpdateContext);
};

export const KanbanBoardProvider = ({ children }) => {
  const [state, dispatch] = useReducerWithLogger(reducer, initialData);

  const addColumn = (payload) => {
    dispatch({ type: ACTIONS.ADD_COLUMN, payload: payload });
  };

  const addItem = (payload) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: payload });
  };

  const moveItem = (payload) => {
    dispatch({ type: ACTIONS.MOVE_ITEM, payload: payload });
  };

  const dispatchFunctions = {
    addColumn: addColumn,
    addItem: addItem,
    moveItem: moveItem,
  };

  return (
    <KanbanBoardContext.Provider value={state}>
      <KanbanBoardUpdateContext.Provider value={dispatchFunctions}>
        {children}
      </KanbanBoardUpdateContext.Provider>
    </KanbanBoardContext.Provider>
  );
};
