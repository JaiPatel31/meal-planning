import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import MealPlanner from './components/MealPlanner';
import { MealPlanProvider } from './components/MealPlanContext';
import Navbar from './components/Navbar';  // Import Navbar

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );

  // Check if the user is authenticated on page load
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('auth-token'); // Optionally, remove auth token as well
  };

  return (
    <MealPlanProvider>
      <Router>
        <div>
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/recipelist"
                element={
                  isAuthenticated ? (
                    <RecipeList />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/mealplanner" element={<MealPlanner />} />
            </Routes>
          </div>
        </div>
      </Router>
    </MealPlanProvider>
  );
};

export default App;
