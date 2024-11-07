import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();  // Call the logout function passed from App.js
    navigate('/login');  // Redirect to the login page
  };

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        <Link to="/" style={linkStyles}>Home</Link>
        <Link to="/recipelist" style={linkStyles}>Recipe List</Link>
        <Link to="/mealplanner" style={linkStyles}>Meal Planner</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={buttonStyles}>Logout</button>
        ) : (
          <Link to="/login" style={linkStyles}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const navStyles = {
  backgroundColor: '#333',
  padding: '10px 20px',
  color: 'white',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
};

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
};

const buttonStyles = {
  color: 'white',
  backgroundColor: 'transparent',
  border: '1px solid white',
  padding: '10px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Navbar;
