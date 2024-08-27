import React, { useState } from 'react';
import Header from './components/Header';
import EnterOptions from './components/EnterOptions';
import MakeSelection from './components/MakeSelection';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [options, setOptions] = useState([]); // Add this line

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        <EnterOptions options={options} setOptions={setOptions} isDarkMode={isDarkMode} /> {/* Pass options and setOptions as props */}
        <MakeSelection options={options} /> {/* Pass options as a prop */}
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default App;
