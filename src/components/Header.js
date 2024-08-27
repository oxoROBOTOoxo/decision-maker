import React from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1>Decision Maker App</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
