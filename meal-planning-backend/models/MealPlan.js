// models/MealPlan.js
const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Link to the User's ObjectId in the User collection
    ref: "User", // Reference to the User model
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,  // Link to the Recipe's ObjectId in the Recipe collection
    ref: "Recipe", // Reference to the Recipe model
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snacks"], // Meal types can be restricted to these
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;