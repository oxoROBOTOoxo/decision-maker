import React from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1>Decision Maker App</h1>
      <nav>
        <a href="#enter-options">Enter Options</a>
        <a href="#make-selection">Make Selection</a>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default Header;
