import React, { useState } from 'react';
import './EnterOptions.css';

const EnterOptions = () => {
  const [numOptions, setNumOptions] = useState(1);
  const [options, setOptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save options and proceed
  };

  return (
    <section className="enter-options" id="enter-options">
      <h2>Enter New Options</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="num-options">Number of Options:</label>
        <input
          type="number"
          id="num-options"
          value={numOptions}
          onChange={(e) => setNumOptions(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Submit Options</button>
      </form>
    </section>
  );
};

export default EnterOptions;
