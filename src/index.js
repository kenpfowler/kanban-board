import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { KanbanBoardProvider } from './KanbanBoardContext';

ReactDOM.render(
  <React.StrictMode>
    <KanbanBoardProvider>
      <App />
    </KanbanBoardProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
