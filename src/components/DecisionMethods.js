import React, { useState } from 'react';
import './DecisionMethods.css';
import { saveHistory } from '../services/firestoreService';

const DecisionMethods = ({ options, setHistory, isLoading }) => {
  const [selectedMethod, setSelectedMethod] = useState('random');
  const [weights, setWeights] = useState({});
  const [eliminationRounds, setEliminationRounds] = useState(1);
  const [votes, setVotes] = useState({});
  const [result, setResult] = useState(null);

  // Random Selection Method
  const randomSelection = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  // Weighted Random Selection Method
  const weightedRandomSelection = () => {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + parseFloat(weight || 0), 0);
    if (totalWeight === 0) return randomSelection();

    let random = Math.random() * totalWeight;
    for (const option of options) {
      const weight = parseFloat(weights[option] || 0);
      if (random <= weight) return option;
      random -= weight;
    }
    return options[options.length - 1];
  };

  // Elimination Rounds Selection Method
  const eliminationRoundsSelection = () => {
    let remainingOptions = [...options];
    for (let i = 0; i < eliminationRounds && remainingOptions.length > 1; i++) {
      const removeIndex = Math.floor(Math.random() * remainingOptions.length);
      remainingOptions.splice(removeIndex, 1);
    }
    return remainingOptions[0];
  };

  // Voting Selection Method
  const votingSelection = () => {
    const totalVotes = Object.values(votes).reduce((sum, vote) => sum + parseInt(vote || 0), 0);
    if (totalVotes === 0) return randomSelection();

    let random = Math.random() * totalVotes;
    for (const option of options) {
      const vote = parseInt(votes[option] || 0);
      if (random <= vote) return option;
      random -= vote;
    }
    return options[options.length - 1];
  };

  // Handle weight change for weighted selection
  const handleWeightChange = (option, value) => {
    setWeights(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const makeDecision = async () => {
    if (isLoading) return;

    let decision;
    switch (selectedMethod) {
      case 'random':
        decision = randomSelection();
        break;
      case 'weighted':
        decision = weightedRandomSelection();
        break;
      case 'elimination':
        decision = eliminationRoundsSelection();
        break;
      case 'voting':
        decision = votingSelection();
        break;
      default:
        decision = null;
    }
    
    setResult(decision);

    // Create history item and save it
    const historyItem = {
      timestamp: new Date().toLocaleString(),
      method: selectedMethod,
      selections: [decision],
    };

    await setHistory(historyItem);
  };

  return (
    <div className="decision-methods">
      <h2>Decision Methods</h2>
      <div className="method-buttons">
        {['random', 'weighted', 'elimination', 'voting'].map(method => (
          <button 
            key={method}
            onClick={() => setSelectedMethod(method)}
            className={`${selectedMethod === method ? 'active' : ''} ${isLoading ? 'disabled' : ''}`}
            disabled={isLoading}
          >
            {method.charAt(0).toUpperCase() + method.slice(1)} Selection
          </button>
        ))}
      </div>

      {selectedMethod === 'weighted' && (
        <div className="input-section">
          {options.map(option => (
            <div key={option} className="input-group">
              <label>{option}:</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={weights[option] || 0}
                onChange={(e) => handleWeightChange(option, e.target.value)}
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={makeDecision} 
        className={`make-decision-btn ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Make Decision'}
      </button>

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default DecisionMethods;