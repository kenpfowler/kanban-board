import { ACTIONS } from './actions';

export const reducer = (state, action) => {
  const { source, destination, draggableId, title, input, column_id, itemId } =
    action.payload;

  switch (action.type) {
    case ACTIONS.ADD_COLUMN:
      //delete column from column order property
      //delete
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
      if (Object.keys(state.items).length) {
        const newItemNumber = Object.keys(state.items)
          .map((item) => item.split('-')[1])
          .sort();
        const nextItemKey = `item-${
          parseInt(newItemNumber[newItemNumber.length - 1], 10) + 1
        }`;
        const updateItemIds = Array.from(state.columns[column_id].itemIds);
        updateItemIds.push(nextItemKey);
        return {
          ...state,
          columns: {
            ...state.columns,
            [state.columns[column_id].id]: {
              ...state.columns[column_id],
              itemIds: updateItemIds,
            },
          },
          items: {
            ...state.items,
            [nextItemKey]: { id: nextItemKey, content: input },
          },
        };
      } else {
        const nextItemKey = 'item-1';
        const updateItemIds = Array.from(state.columns[column_id].itemIds);
        updateItemIds.push(nextItemKey);
        return {
          ...state,
          columns: {
            ...state.columns,
            [state.columns[column_id].id]: {
              ...state.columns[column_id],
              itemIds: updateItemIds,
            },
          },
          items: {
            ...state.items,
            [nextItemKey]: { id: nextItemKey, content: input },
          },
        };
      }
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
        return newState;
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
        return newState;
      }
    case ACTIONS.MOVE_COLUMN:
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = { ...state, columnOrder: newColumnOrder };
      return newState;

    case ACTIONS.REMOVE_ITEM:
      //remove the item from the items array
      const newItems = { ...state.items };
      delete newItems[itemId];

      //remove the same from the correct columns items array
      const newItemIds = Array.from(state.columns[column_id].itemIds);
      const filteredItemIds = newItemIds.filter((item) => item !== itemId);
      const new_State = {
        ...state,
        items: { ...newItems },
        columns: {
          ...state.columns,
          [column_id]: {
            ...state.columns[column_id],
            itemIds: filteredItemIds,
          },
        },
      };
      return new_State;
    case ACTIONS.REMOVE_COLUMN:
      console.log(action.payload);
      return { ...state };
    default:
      return state;
  }
};
