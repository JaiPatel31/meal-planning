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
    <div className="register-container">
      <div className="register-form">
        {/* Add Register title */}
        <h2 className="register-header">Register</h2> 
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="register-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register-button" type="submit">Register</button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link> {/* Link to login page */}
        </p>
      </div>
    </div>
  );
}

export default Register;
