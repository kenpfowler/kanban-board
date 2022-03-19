import React, { useContext, useEffect, useCallback } from 'react';
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
  const [state, dispatch] = useReducerWithLogger(reducer, {
    loading: true,
    errorMessage: null,
  });

  const addColumn = (payload) => {
    dispatch({ type: ACTIONS.ADD_COLUMN, payload: payload });
  };

  const addItem = (payload) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: payload });
  };

  const moveItem = (payload) => {
    dispatch({ type: ACTIONS.MOVE_ITEM, payload: payload });
  };

  const moveColumn = (payload) => {
    dispatch({ type: ACTIONS.MOVE_COLUMN, payload: payload });
  };

  const removeColumn = (payload) => {
    dispatch({ type: ACTIONS.REMOVE_COLUMN, payload: payload });
  };

  const removeItem = (payload) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: payload });
  };

  const updateItem = (payload) => {
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: payload });
  };

  const updateColumn = (payload) => {
    dispatch({ type: ACTIONS.UPDATE_COLUMN, payload: payload });
  };

  const fetchBoard = useCallback(() => {
    dispatch({ type: ACTIONS.FETCH_BOARD, loading: true });
  }, [dispatch]);

  const fetchBoardSuccess = useCallback(
    (payload) => {
      dispatch({
        type: ACTIONS.FETCH_BOARD_SUCCCESS,
        payload: payload,
      });
    },
    [dispatch]
  );

  const fetchBoardFailure = useCallback(
    (payload) => {
      dispatch({ type: ACTIONS.FETCH_BOARD_FAILURE, payload: payload });
    },
    [dispatch]
  );

  const dispatchFunctions = {
    addColumn: addColumn,
    addItem: addItem,
    moveItem: moveItem,
    moveColumn: moveColumn,
    removeColumn: removeColumn,
    removeItem: removeItem,
    updateColumn: updateColumn,
    updateItem: updateItem,
    fetchBoard: fetchBoard,
    fetchBoardSuccess: fetchBoardSuccess,
    fetchBoardFailure,
  };

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        fetchBoard();
        const data = await fetch('https://kan-ban-board.herokuapp.com');
        const json = await data.json();
        const kabanBoard = json.board;
        fetchBoardSuccess(kabanBoard);
      } catch (error) {
        fetchBoardFailure({ errorMessage: error });
      }
    }
    fetchMyAPI();
  }, [fetchBoard, fetchBoardFailure, fetchBoardSuccess]);

  return (
    <KanbanBoardContext.Provider value={state}>
      <KanbanBoardUpdateContext.Provider value={dispatchFunctions}>
        {children}
      </KanbanBoardUpdateContext.Provider>
    </KanbanBoardContext.Provider>
  );
};
