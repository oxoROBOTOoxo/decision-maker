// src/components/OptionItem.js
import React from 'react';

const OptionItem = ({ index, value, onChange }) => {
  return (
    <div style={styles.container}>
      <label>Option {index + 1}:</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(index, e.target.value)}
        style={styles.input}
        required
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: '10px',
    padding: '5px',
    flex: '1'
  }
};

export default OptionItem;
