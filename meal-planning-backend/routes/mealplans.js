const express = require('express');
const MealPlan = require('../models/MealPlan');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Save the user's meal plan
router.post('/', authenticateToken, async (req, res) => {
  const { recipe, selectedDate, mealType } = req.body;
  
  try {
    const newMeal = new MealPlan({
      userId: req.user._id,  // Use user ID from the authenticated user
      recipe,
      selectedDate,
      mealType,
    });
    await newMeal.save();
    res.status(201).json({ message: 'Meal added to meal plan' });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ error: 'Failed to save meal plan' });
  }
});

// Fetch the user's meal plans
router.get('/', authenticateToken, async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ userId: req.user._id });
    res.json(mealPlans);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    res.status(500).json({ error: 'Failed to fetch meal plans' });
  }
});
// In your backend routes (e.g., mealplans.js or mealplans route file)
router.delete('/:mealId', async (req, res) => {
  try {
    const { mealId } = req.params;

    // Assuming the mealplans are stored in a 'MealPlan' model
    const deletedMeal = await MealPlan.findByIdAndDelete(mealId);
    
    if (!deletedMeal) {
      return res.status(404).json({ message: 'Meal plan not found.' });
    }
    
    res.status(200).json({ message: 'Meal plan deleted successfully.' });
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;