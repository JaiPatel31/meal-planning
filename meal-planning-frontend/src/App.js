import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NutritionalGoals from './components/NutritionalGoals';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail'; // Import RecipeDetail

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGoalsSubmit = async (goals) => {
    // Your existing handleGoalsSubmit function
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Redirect root to /register */}
          <Route path="/register" element={<Register />} />
          <Route path="/RecipeList" element={<RecipeList />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/goals" element={isAuthenticated ? (
            <NutritionalGoals onSubmit={handleGoalsSubmit} />
          ) : (
            <Navigate to="/login" />
          )} />
          <Route path="/recipes/:id" element={<RecipeDetail />} /> {/* New route for recipe details */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;