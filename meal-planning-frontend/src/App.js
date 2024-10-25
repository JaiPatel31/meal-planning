import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NutritionalGoals from './components/NutritionalGoals';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          console.log(data);
      } catch (error) {
          console.error('Error:', error);
      }
  };

  return (
      <Router>
          <div>
              <h1>Meal Planning</h1>
              <Routes>
                  <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect root to /register */}
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                  <Route
                      path="/goals"
                      element={isAuthenticated ? (
                          <NutritionalGoals onSubmit={handleGoalsSubmit} />
                      ) : (
                          <Navigate to="/login" />
                      )}
                  />
              </Routes>
          </div>
      </Router>
  );
};

export default App;