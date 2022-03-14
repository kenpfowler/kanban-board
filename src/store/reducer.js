import { ACTIONS } from './actions';

export const reducer = (state, action) => {
  const { source, destination, draggableId, title, input, column_id, itemId } =
    action.payload;

  switch (action.type) {
    case ACTIONS.ADD_COLUMN:
      if (!state.columnOrder.length) {
        const newColumnOrder = ['column-1'];
        const newColumns = {
          ...state.columns,
          'column-1': { id: 'column-1', title: title, itemIds: [] },
        };
        return { ...state, columnOrder: newColumnOrder, columns: newColumns };
      } else {
        const newColumnNumber = Object.keys(state.columns)
          .map((column) => column.split('-')[1])
          .sort();

        const nextColumnKey = `column-${
          parseInt(newColumnNumber[newColumnNumber.length - 1], 10) + 1
        }`;

        const newColumnOrder = Array.from(state.columnOrder);
        newColumnOrder.push(nextColumnKey);

        const newColumn = {
          ...state.columns,
          [nextColumnKey]: { id: nextColumnKey, title: title, itemIds: [] },
        };

        return {
          ...state,
          columns: newColumn,
          columnOrder: newColumnOrder,
        };
      }

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
      //need columnid in paylaod
      //remove column from the columnOrder array and return new array
      const newColumnOrder2 = Array.from(state.columnOrder).filter(
        (column) => column !== column_id
      );
      //remove all items associated with removed column and return new array
      console.log(column_id);
      const itemsToRemove = Array.from(state.columns[column_id].itemIds);
      console.log(itemsToRemove);
      const newItems2 = { ...state.items };
      console.log(newItems2);
      itemsToRemove.forEach((itemToRemove) => {
        console.log('inner loop', itemToRemove);
        for (const item in newItems2) {
          console.log('outer loop', item);
          if (itemToRemove === item) {
            delete newItems2[item];
          }
        }
      });
      //remmove column property from the column object
      const newColumnToRemove = { ...state.columns };
      delete newColumnToRemove[column_id];
      return {
        ...state,
        columnOrder: newColumnOrder2,
        items: newItems2,
        columns: newColumnToRemove,
      };
    default:
      return state;
  }
};
