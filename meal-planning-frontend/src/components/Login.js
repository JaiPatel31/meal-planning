import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("auth-token", token); // Store token in localStorage
      alert("Login successful");

      onLogin(); // Update authentication state in App component
      navigate("/recipelist"); // Redirect to NutritionalGoals page
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid username or password."); // Optional: Alert on failure
    }
  };

  return (
    <div>
      <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <p className="input">username</p>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="input">password</p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="register-prompt">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
    <div className='footer'>
                <div className='footer-content'>
                    <div className='footer-left'>
                        <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1730144316/Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo_processed_yb2a5y.png" alt="Meal Planning App Logo" className='footer-logo'/>
                        <h1>SavvyEats</h1>
                    </div>
                    <div className='footer-right'>
                        <a href='/blog' className='footer-text'>Blog</a>
                        <a href='/meal-plans' className='footer-text'>Meal Plans</a>
                        <a href='/recipes' className='footer-text'>Recipes</a>
                        <a href='/about-us' className='footer-text'>About Us</a>
                        <a href='/footer-text' className='footer-text'>Contact Us</a>
                        <a href='/register' className='footer-text'>Get Started</a>
                    </div>
                    <hr className='footer-line'/>
                    <div className='footer-bottom'>
                        <p>&copy; 2024 SavvyEats. All rights reserved.</p>
                    </div>
                </div>
            </div>
    </div>
  );
}

export default Login;
