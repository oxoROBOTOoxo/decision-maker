import React, { useState } from 'react';
import Header from './components/Header';
import EnterOptions from './components/EnterOptions';
import DecisionMethods from './components/DecisionMethods';
import SelectionHistory from './components/SelectionHistory';
import './App.css';

function App() {
  const [options, setOptions] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="app-content">
        <div className="left-side">
          <EnterOptions 
            options={options} 
            setOptions={setOptions} 
            isDarkMode={isDarkMode} 
          />
          <SelectionHistory history={history} />
        </div>
        <div className="right-side">
          <DecisionMethods options={options} setHistory={setHistory} />
        </div>
      </div>
    </div>
  );
}

export default App;