import React, { useState } from 'react';
import Header from './components/Header';
import EnterOptions from './components/EnterOptions';
import MakeSelection from './components/MakeSelection';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  return (
    <div className="app">
      <Header />
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <EnterOptions isDarkMode={isDarkMode} />
        <MakeSelection />
      </main>
    </div>
  );
}

export default App;
