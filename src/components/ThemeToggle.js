import React, { useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle('light-mode', isLightMode);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isLightMode ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default ThemeToggle;
