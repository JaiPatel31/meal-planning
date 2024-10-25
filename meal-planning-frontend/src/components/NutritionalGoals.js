// NutritionalGoals.js
import React, { useState } from 'react';

const NutritionalGoals = ({ onSubmit }) => {
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ protein, carbs, fats });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Protein (g):
        <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} />
      </label>
      <label>
        Carbs (g):
        <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
      </label>
      <label>
        Fats (g):
        <input type="number" value={fats} onChange={(e) => setFats(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NutritionalGoals;
