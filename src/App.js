import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import EnterOptions from './components/EnterOptions';
import DecisionMethods from './components/DecisionMethods';
import SelectionHistory from './components/SelectionHistory';
import { getOptions, getHistory, saveOptions, saveHistory } from './firestoreService';
import './App.css';

function App() {
  const [options, setOptions] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data from Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Get options
        const optionsData = await getOptions();
        if (optionsData.length > 0) {
          setOptions(optionsData[0].options);
        }
        
        // Get history
        const historyData = await getHistory();
        setHistory(historyData);
        
        setError(null);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Handle options update
  const handleOptionsUpdate = async (newOptions) => {
    try {
      setIsLoading(true);
      await saveOptions(newOptions);
      setOptions(newOptions);
      setError(null);
    } catch (error) {
      console.error("Error updating options:", error);
      setError("Failed to save options. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle history update
  const handleHistoryUpdate = async (newHistoryItem) => {
    try {
      setIsLoading(true);
      const savedHistoryId = await saveHistory(newHistoryItem);
      // Add the ID to the history item
      const historyItemWithId = {
        ...newHistoryItem,
        id: savedHistoryId
      };
      setHistory(prevHistory => [historyItemWithId, ...prevHistory]);
      setError(null);
    } catch (error) {
      console.error("Error updating history:", error);
      setError("Failed to save decision history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <Header 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={isDarkMode} 
        />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-spinner">
            Loading...
          </div>
        )}

        <div className="app-content">
          <div className="left-side">
            <EnterOptions 
              options={options} 
              setOptions={handleOptionsUpdate} 
              isDarkMode={isDarkMode}
              isLoading={isLoading}
            />
            <SelectionHistory 
              history={history}
              isLoading={isLoading}
            />
          </div>
          <div className="right-side">
            <DecisionMethods 
              options={options} 
              setHistory={handleHistoryUpdate}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;