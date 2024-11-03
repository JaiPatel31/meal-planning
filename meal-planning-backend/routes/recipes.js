const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// GET paginated recipes
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  try {
    const recipes = await Recipe.find()
      .skip((page - 1) * limit) // Skip items for previous pages
      .limit(limit); // Limit number of items

    const totalRecipes = await Recipe.countDocuments(); // Total recipe count for pagination

    res.status(200).json({
      recipes,
      currentPage: page,
      totalPages: Math.ceil(totalRecipes / limit),
      totalRecipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Error fetching recipes." });
  }
});

// GET a single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id); // Fetch the recipe using the ObjectID
    if (!recipe) return res.status(404).json({ message: "Recipe not found." }); // Handle the case where the recipe is not found
    res.status(200).json(recipe); // Return the found recipe
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe." });
  }
});


module.exports = router;