import React, { useState } from 'react';
import './MakeSelection.css';

const MakeSelection = ({ options = [], setHistory }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [numSelections, setNumSelections] = useState(1);

  const selectRandomOptions = (count) => {
    const optionsCopy = [...options];
    const selections = [];

    for (let i = 0; i < count; i++) {
      if (optionsCopy.length === 0) break;
      const randomIndex = Math.floor(Math.random() * optionsCopy.length);
      selections.push(optionsCopy[randomIndex]);
      optionsCopy.splice(randomIndex, 1);
    }

    return selections;
  };

  const handleSelection = () => {
    const selected = selectRandomOptions(numSelections);
    setSelectedOptions(selected);
    const timestamp = new Date().toLocaleString();
    setHistory((prevHistory) => [
      ...prevHistory,
      { timestamp, selections: selected },
    ]);
  };

  return (
    <div className="container">
      <h2>Make a Random Selection</h2>
      <div className="inputGroup">
        <label>Number of Selections:</label>
        <select
          value={numSelections}
          onChange={(e) => setNumSelections(parseInt(e.target.value))}
          className="select"
        >
          {Array.from({ length: options.length }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSelection} className="submitButton">
        Select Options
      </button>
      {selectedOptions.length > 0 && (
        <div className="result">
          <h3>Selected Options:</h3>
          <p>{selectedOptions.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default MakeSelection;
