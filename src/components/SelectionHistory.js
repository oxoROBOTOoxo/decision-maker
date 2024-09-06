import React from 'react';
import './SelectionHistory.css';

const SelectionHistory = ({ history }) => {
  return (
    <div className="history-container">
      <h2>Selection History</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        history.map((item, index) => (
          <div key={index} className="history-item">
            <div className="timestamp">{item.timestamp}</div>
            <div className="method">{item.method}</div>
            <div className="selections">
              {item.selections.map((selection, i) => (
                <div key={i}>{selection}</div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SelectionHistory;