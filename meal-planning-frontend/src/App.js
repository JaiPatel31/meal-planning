import React from 'react';
import NutritionalGoals from './NutritionalGoals';

const App = () => {
  const handleGoalsSubmit = async (goals) => {
      try {
          const response = await fetch('http://localhost:5000/api/goals', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(goals),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log(data); // Handle the filtered recipes here
      } catch (error) {
          console.error('Error:', error);
      }
  };

  return (
      <div>
          <h1>Meal Planning</h1>
          <NutritionalGoals onSubmit={handleGoalsSubmit} />
          {/* Render filtered recipes here */}
      </div>
  );
};

export default App;