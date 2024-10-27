import React from 'react';

const OptionItem = ({ index, value, onChange, isDarkMode, disabled }) => (
  <div>
    <label>Option {index + 1}:</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${isDarkMode ? 'dark-input' : ''} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
    />
  </div>
);

export default OptionItem;