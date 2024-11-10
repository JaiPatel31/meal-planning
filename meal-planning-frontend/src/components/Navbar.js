import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import "./Navbar.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 100,
      width: 100,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "#f73302",
      mixBlendMode: "screen"
    }
  }

  const handleLogout = () => {
    onLogout();  // Call the logout function passed from App.js
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div className='main'>
      <motion.div
          className='cursor'
          variants={variants}
          animate={cursorVariant}
      />
        <nav className='main-nav'>
            <div className='left-nav'>
                <Link to="/" className='nav-item'>Home</Link>
                <Link to="/recipelist" className='nav-item'>Recipes</Link>
                <Link to="/mealplanner" className='nav-item'>Meal Planner</Link>
            </div>
            <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1730144316/Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo_processed_yb2a5y.png" alt="Meal Planning App Logo" className='logo-image'/>
            <div className='right-nav'>
                <Link to="/about" className='nav-item'> About Us</Link>
                <Link to="/contact-us" className='nav-item'>Contact Us</Link>
                {isAuthenticated ? (
                  <button onClick={handleLogout} className='logout-button'>Logout</button>
                ) : (
                  <Link to="/login" className='nav-item'>Get Started</Link>
                )}
            </div>
        </nav>
    </div>
  );
};


export default Navbar;
