import React, { useState } from 'react';
import OptionItem from './OptionItem';
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
    const filledOptions = options.filter(option => option.trim() !== '');
    if (filledOptions.length === 0) {
      alert('Please enter at least one valid option.');
      return;
    }
    setOptions(filledOptions);
    alert('Options entered successfully!');
    navigate('/');
  };

  return (
    <div style={{
      ...styles.container,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#000'
    }}>
      <h2>Enter New Options</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Number of Options:</label>
          <input
            type="number"
            value={numOptions}
            onChange={handleNumOptionsChange}
            min="1"
            style={styles.input}
          />
        </div>
        {options.map((option, index) => (
          <OptionItem
            key={index}
            index={index}
            value={option}
            onChange={handleOptionChange}
          />
        ))}
        <button type="submit" style={styles.submitButton}>Submit Options</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    padding: '5px',
    fontSize: '16px',
  },
  submitButton: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default EnterOptions;
