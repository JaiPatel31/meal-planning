import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail'; // Import RecipeDetail
import MealPlanner from './components/MealPlanner';
import { MealPlanProvider } from "./components/MealPlanContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <>
      <MealPlanProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} /> {/* Redirect root to /register */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/recipelist" element={isAuthenticated ? (
                <RecipeList />
              ) : (
                <Navigate to="/login" />
              )} />
              <Route path="/recipes/:id" element={<RecipeDetail />} /> {/* New route for recipe details */}
              <Route path="/mealplanner" element={<MealPlanner />} />
            </Routes>
          </div>
        </Router>
      </MealPlanProvider>
    </>
  );
};

export default App;