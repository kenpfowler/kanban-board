const initialData = {
  items: {
    'item-1': { id: 'item-1', content: 'Weight Training' },
    'item-2': { id: 'item-2', content: 'Cleaning the hosue' },
    'item-3': { id: 'item-3', content: 'Cooking' },
    'item-4': { id: 'item-4', content: 'Blogging' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: "To Do's",
      itemIds: ['item-1', 'item-2', 'item-3', 'item-4'],
    },
  },
  columnOrder: ['column-1'],
};

export default initialData;
