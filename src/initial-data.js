const initialData = {
  items: {
    'item-1': { id: 'item-1', content: 'Weight Training' },
    'item-2': { id: 'item-2', content: 'Cleaning the hosue' },
    'item-3': { id: 'item-3', content: 'Cooking' },
    'item-4': { id: 'item-4', content: 'Blogging' },
    'item-5': { id: 'item-5', content: 'Howl at the Moon' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: "To Do's",
      itemIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      itemIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      itemIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
