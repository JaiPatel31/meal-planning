// RecipeDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}`); // Using the ObjectID in the request
        setRecipe(response.data); // Set the recipe data in state
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>; // Show loading indicator while fetching

  if (!recipe) return <div>Recipe not found.</div>; // Handle case where recipe isn't found

  return (
    <div>
      <h1>{recipe.Name}</h1>
      <p><strong>Description:</strong> {recipe.Description}</p>
      <p><strong>Cook Time:</strong> {recipe.CookTime}</p>
      <p><strong>Prep Time:</strong> {recipe.PrepTime}</p>
      <p><strong>Total Time:</strong> {recipe.TotalTime}</p>
      <p><strong>Servings:</strong> {recipe.RecipeServings}</p>
      <p><strong>Calories:</strong> {recipe.Calories}</p>
      <img src={recipe.Images[0]} alt={recipe.Name} style={{ width: '300px' }} />
      <h3>Ingredients</h3>
      <ul>
        {recipe.RecipeIngredientParts.map((ingredient, index) => (
          <li key={index}>
            {recipe.RecipeIngredientQuantities[index]} {ingredient}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {recipe.RecipeInstructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
