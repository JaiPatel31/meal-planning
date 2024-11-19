const mongoose = require('mongoose');

// Define the schema for a recipe
const recipeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  CookTime: { type: String },
  PrepTime: { type: String },
  TotalTime: { type: String },
  Description: { type: String },
  Images: { type: [String] },  // Array of image URLs or paths
  RecipeCategory: { type: String },
  Keywords: { type: [String] }, // Array of keywords
  RecipeIngredientQuantities: { type: [String] }, // Array of quantities (e.g., '1 cup')
  RecipeIngredientParts: { type: [String] }, // Array of ingredient names
  Calories: { type: Number },
  FatContent: { type: String },
  SaturatedFatContent: { type: String },
  CholesterolContent: { type: String },
  SodiumContent: { type: String },
  CarbohydrateContent: { type: String },
  FiberContent: { type: String },
  SugarContent: { type: String },
  ProteinContent: { type: String },
  RecipeServings: { type: Number },
  RecipeYield: { type: String },
  RecipeInstructions: { type: [String] } // Array of instructions
});

// Avoid overwriting the model if it's already defined
const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;