import React, { useState } from 'react';
import Header from './components/Header';
import EnterOptions from './components/EnterOptions';
import MakeSelection from './components/MakeSelection';
import SelectionHistory from './components/SelectionHistory'; // Ensure this is imported
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [options, setOptions] = useState([]); 
  const [history, setHistory] = useState([]);  // State for tracking history

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
        <EnterOptions options={options} setOptions={setOptions} isDarkMode={isDarkMode} />
        <MakeSelection options={options} setHistory={setHistory} /> {/* Pass setHistory as a prop */}
        <SelectionHistory history={history} /> {/* Pass history to SelectionHistory */}
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default App;
