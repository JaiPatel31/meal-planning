import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

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
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link style={{ color: 'blue', textDecoration: 'underline' }} to="/login">Login</Link> {/* Link to login page */}
      </p>
    </div>
  );
}

export default Register;
