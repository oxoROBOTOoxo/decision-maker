import React from 'react';
import Header from './components/Header';
import EnterOptions from './components/EnterOptions';
import MakeSelection from './components/MakeSelection';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <EnterOptions />
        <MakeSelection />
      </main>
    </div>
  );
}

export default App;
