import { ACTIONS } from './actions';

export const reducer = (state, action) => {
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
    case ACTIONS.ADD_ITEM:
      const { input, column_id } = action.payload;
      const nextItemId = Object.keys(state.items).length + 1;
      const nextItemKey = `item-${nextItemId}`;
      state.columns[column_id].itemIds.push(nextItemKey);

      return {
        ...state,
        items: {
          ...state.items,
          [nextItemKey]: { id: nextItemKey, content: input },
        },
      };
    case ACTIONS.MOVE_ITEM:
      const start = state.columns[action.payload.source.droppableId];
      const finish = state.columns[action.payload.destination.droppableId];
      if (start === finish) {
        const newItemIds = Array.from(start.itemIds);
        newItemIds.splice(action.payload.source.index, 1);
        newItemIds.splice(
          action.payload.destination.index,
          0,
          action.payload.draggableId
        );
        const newColumn = { ...start, itemIds: newItemIds };
        const newState = {
          ...state,
          columns: { ...state.columns, [newColumn.id]: newColumn },
        };
        return { ...newState };
      } else {
        const startItemIds = Array.from(start.itemIds);
        startItemIds.splice(action.payload.source.index, 1);
        const newStart = { ...start, itemIds: startItemIds };
        const finishItemIds = Array.from(finish.itemIds);
        finishItemIds.splice(
          action.payload.destination.index,
          0,
          action.payload.draggableId
        );
        const newFinish = { ...finish, itemIds: finishItemIds };
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
        return { ...newState };
      }
    case ACTIONS.MOVE_COLUMN:
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(action.payload.source.index, 1);
      newColumnOrder.splice(
        action.payload.destination.index,
        0,
        action.payload.draggableId
      );
      const newState = { ...state, columnOrder: newColumnOrder };
      return newState;
    default:
      return state;
  }
};
