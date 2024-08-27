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
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="content-wrapper">
        <div className="options-container">
          <EnterOptions options={options} setOptions={setOptions} isDarkMode={isDarkMode} />
          <MakeSelection options={options} setHistory={setHistory} />
        </div>
        <SelectionHistory history={history} />
      </div>
    </div>
  );
  
}

export default App;
