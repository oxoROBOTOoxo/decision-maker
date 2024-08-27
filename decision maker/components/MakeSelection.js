import React, { useState } from 'react';
import './MakeSelection.css';

const MakeSelection = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = () => {
    // Logic to randomly select an option
  };

  return (
    <section className="make-selection" id="make-selection">
      <h2>Make a Selection</h2>
      <button onClick={handleSelection}>Select Option</button>
      {selectedOption && <p>Selected: {selectedOption}</p>}
    </section>
  );
};

export default MakeSelection;
