import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", {
        username,
        password,
      });
      alert("Registration successful");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div>
      <div className="register-container">
      <div className="register-form">
        <form onSubmit={handleRegister}>
          <p className="input">username</p>
          <input
            type="text"
            className="register-input"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="input">password</p>
          <input
            type="password"
            className="register-input"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register-button" type="submit">Register</button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link> {/* Link to login page */}
        </p>
      </div>
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

export default Register;
