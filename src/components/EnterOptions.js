import React, { useState } from 'react';
import OptionItem from './OptionItem';
import './EnterOptions.css';
import { useNavigate } from 'react-router-dom';

const EnterOptions = ({ options = [], setOptions, isDarkMode }) => {
  const [numOptions, setNumOptions] = useState(1);
  const navigate = useNavigate();

  const handleNumOptionsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumOptions(count > 0 ? count : 1);
    setOptions(Array(count > 0 ? count : 1).fill(''));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledOptions = options.filter(option => typeof option === 'string' && option.trim() !== '');
    if (filledOptions.length === 0) {
      alert('Please enter at least one valid option.');
      return;
    }
    setOptions(filledOptions);
    alert('Options entered successfully!');
    navigate('/');
  };
  

  return (
    <div className="container">
      <div className={`enter-options-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <h2>Enter New Options</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>Number of Options:</label>
            <input
              type="number"
              value={numOptions}
              onChange={handleNumOptionsChange}
              min="1"
              className={isDarkMode ? 'dark-input' : ''}
            />
          </div>
          {options.map((option, index) => (
            <OptionItem
              key={index}
              index={index}
              value={option}
              onChange={(value) => handleOptionChange(index, value)}
              isDarkMode={isDarkMode}
            />
          ))}
          <button type="submit">Submit Options</button>
        </form>
      </div>
    </div>
  );
};

export default EnterOptions;