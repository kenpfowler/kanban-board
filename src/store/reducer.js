import { ACTIONS } from './actions';

export const reducer = (state, action) => {
  const { source, destination, draggableId, title, input, column_id } =
    action.payload;

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
          [columnId]: { id: columnId, title: title, itemIds: [] },
        },
      };
    case ACTIONS.ADD_ITEM:
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
      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];
      if (start === finish) {
        const newItemIds = Array.from(start.itemIds);
        newItemIds.splice(source.index, 1);
        newItemIds.splice(destination.index, 0, draggableId);
        const newColumn = { ...start, itemIds: newItemIds };
        const newState = {
          ...state,
          columns: { ...state.columns, [newColumn.id]: newColumn },
        };
        return { ...newState };
      } else {
        const startItemIds = Array.from(start.itemIds);
        startItemIds.splice(source.index, 1);
        const newStart = { ...start, itemIds: startItemIds };
        const finishItemIds = Array.from(finish.itemIds);
        finishItemIds.splice(destination.index, 0, draggableId);
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
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = { ...state, columnOrder: newColumnOrder };
      return newState;
    default:
      return state;
  }
};
