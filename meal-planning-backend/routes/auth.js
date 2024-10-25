const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user." });
  }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: "Invalid email or password." });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ message: "Invalid email or password." });
  
      // Generate token
      const token = jwt.sign({ _id: user._id }, "your_jwt_secret_key", { expiresIn: "1h" });
  
      res.header("auth-token", token).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error logging in." });
    }
  });
  
  module.exports = router;
  