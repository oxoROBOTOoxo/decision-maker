import React, { useState } from 'react';
import './DecisionMethods.css';

const DecisionMethods = ({ options, setHistory, isLoading }) => {
  const [selectedMethod, setSelectedMethod] = useState('random');
  const [weights, setWeights] = useState({});
  const [eliminationRounds, setEliminationRounds] = useState(1);
  const [votes, setVotes] = useState({});
  const [result, setResult] = useState(null);

  // ... (keep existing helper functions)

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

      {/* ... (other method-specific inputs) */}

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