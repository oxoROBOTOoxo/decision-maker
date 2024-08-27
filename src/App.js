import React, { useState } from 'react';
import Header from './components/Header';
import EnterOptions from './components/EnterOptions';
import MakeSelection from './components/MakeSelection';
import SelectionHistory from './components/SelectionHistory'; // Ensure this is imported
import './App.css';


function App() {
  const [options, setOptions] = useState([]); 
  const [history, setHistory] = useState([]);  // State for tracking history
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        <div className="left-side">
        <EnterOptions 
          options={options} 
          setOptions={setOptions} 
          isDarkMode={isDarkMode} />
        </div>
        <div className="right-side">
          <MakeSelection options={options} setHistory={setHistory} />
          <SelectionHistory history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;
