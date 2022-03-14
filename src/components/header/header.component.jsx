import React from 'react';
import './header.styles.css';
import ReactLogo from './react-icon.svg';

const Header = ({ title, setTitle, addColumn }) => {
  return (
    <header>
      <div className="header__logo-container">
        <img src={ReactLogo} className="logo" alt="logo" />
        <h1>Kanban Board</h1>
      </div>
      <div>
        <div className="column__input">
          <input
            type="text"
            placeholder="Give your list a title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button
            className="btn button-secondary"
            onClick={() => {
              if (!title) {
                return;
              }
              addColumn({ title: title });
              setTitle('');
            }}
          >
            Create New List
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
