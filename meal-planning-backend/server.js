// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Meal Planning API!');
  });

app.post('/api/goals', (req, res) => {
    console.log('Received data:', req.body);
  const { protein, carbs, fats } = req.body;
  // Here, you would filter recipes based on these nutritional goals.
  // For now, send back a placeholder response.
  res.json({ message: 'Goals received', goals: req.body });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
