const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const mealPlansRoutes = require("./routes/mealplans");
const imageRoutes = require("./routes/imageRoutes"); // Import the image routes
const chatbotRoute = require('./routes/chatbot'); // Import the chatbot route
// Connect to MongoDB
mongoose.connect("mongodb+srv://jaipatel4717:bxmqtEaDUtLmRgue@mealplanningusers.sapy2.mongodb.net/?retryWrites=true&w=majority&appName=MealPlanningUsers", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/mealplans", mealPlansRoutes);
app.use("/api/images", imageRoutes); // Add the image route
app.use('/api/chat', chatbotRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Meal Planning API!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
