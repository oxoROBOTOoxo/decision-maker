import React, { useState } from 'react';
import './DecisionMethods.css'; // We'll create this file for styling

const DecisionMethods = ({ options, setHistory }) => {
  const [selectedMethod, setSelectedMethod] = useState('random');
  const [weights, setWeights] = useState({});
  const [eliminationRounds, setEliminationRounds] = useState(1);
  const [votes, setVotes] = useState({});
  const [result, setResult] = useState(null);

  // Helper function to generate a timestamp
  const getTimestamp = () => new Date().toLocaleString();

  // Random Selection
  const randomSelection = () => {
    const selected = options[Math.floor(Math.random() * options.length)];
    updateHistory('Random Selection', [selected]);
    return selected;
  };

  // Weighted Random Selection
  const weightedRandomSelection = () => {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const option of options) {
      random -= weights[option] || 0;
      if (random <= 0) {
        updateHistory('Weighted Random Selection', [option]);
        return option;
      }
    }
  };

  // Elimination Rounds
  const eliminationRoundsSelection = () => {
    let remainingOptions = [...options];
    const rounds = [];

    for (let i = 0; i < eliminationRounds; i++) {
      if (remainingOptions.length > 1) {
        const eliminatedIndex = Math.floor(Math.random() * remainingOptions.length);
        const eliminated = remainingOptions.splice(eliminatedIndex, 1)[0];
        rounds.push(`Round ${i + 1}: Eliminated ${eliminated}`);
      }
    }

    const winner = remainingOptions[0];
    rounds.push(`Winner: ${winner}`);
    updateHistory('Elimination Rounds', rounds);
    return winner;
  };

  // Voting
  const votingSelection = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const winners = options.filter(option => votes[option] === maxVotes);
    const winner = winners[Math.floor(Math.random() * winners.length)];
    updateHistory('Voting', [`Winner: ${winner} (${maxVotes} votes)`]);
    return winner;
  };

  // Update history
  const updateHistory = (method, selections) => {
    setHistory(prevHistory => [
      { timestamp: getTimestamp(), method, selections },
      ...prevHistory
    ]);
  };

  // Handle method selection
  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setResult(null);
  };

  // Handle weight change
  const handleWeightChange = (option, weight) => {
    setWeights(prevWeights => ({ ...prevWeights, [option]: parseFloat(weight) }));
  };

  // Handle vote change
  const handleVoteChange = (option, voteCount) => {
    setVotes(prevVotes => ({ ...prevVotes, [option]: parseInt(voteCount) }));
  };

  // Render weight inputs
  const renderWeightInputs = () => (
    <div className="input-section">
      <h3>Set Weights:</h3>
      {options.map(option => (
        <div key={option} className="input-group">
          <label>{option}:</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={weights[option] || 0}
            onChange={(e) => handleWeightChange(option, e.target.value)}
          />
        </div>
      ))}
    </div>
  );

  // Render vote inputs
  const renderVoteInputs = () => (
    <div className="input-section">
      <h3>Enter Votes:</h3>
      {options.map(option => (
        <div key={option} className="input-group">
          <label>{option}:</label>
          <input
            type="number"
            min="0"
            value={votes[option] || 0}
            onChange={(e) => handleVoteChange(option, e.target.value)}
          />
        </div>
      ))}
    </div>
  );

  // Make decision based on selected method
  const makeDecision = () => {
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
  };

  return (
    <div className="decision-methods">
      <h2>Decision Methods</h2>
      <div className="method-buttons">
        <button 
          onClick={() => handleMethodChange('random')}
          className={selectedMethod === 'random' ? 'active' : ''}
        >
          Random Selection
        </button>
        <button 
          onClick={() => handleMethodChange('weighted')}
          className={selectedMethod === 'weighted' ? 'active' : ''}
        >
          Weighted Random
        </button>
        <button 
          onClick={() => handleMethodChange('elimination')}
          className={selectedMethod === 'elimination' ? 'active' : ''}
        >
          Elimination Rounds
        </button>
        <button 
          onClick={() => handleMethodChange('voting')}
          className={selectedMethod === 'voting' ? 'active' : ''}
        >
          Voting
        </button>
      </div>

      {selectedMethod === 'weighted' && renderWeightInputs()}
      {selectedMethod === 'elimination' && (
        <div className="input-section">
          <label>Number of Elimination Rounds:</label>
          <input
            type="number"
            min="1"
            max={options.length - 1}
            value={eliminationRounds}
            onChange={(e) => setEliminationRounds(parseInt(e.target.value))}
          />
        </div>
      )}
      {selectedMethod === 'voting' && renderVoteInputs()}

      <button onClick={makeDecision} className="make-decision-btn">Make Decision</button>

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