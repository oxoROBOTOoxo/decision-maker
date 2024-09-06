import React from 'react';
import './Header.css';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="app-header">
      <h1>Decision Maker App</h1>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
};

export default Header;