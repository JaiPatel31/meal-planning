import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useLocation } from 'react-router-dom';

const MealPlanner = () => {
    const location = useLocation();
    const { recipe, selectedDate, mealType } = location.state || {};
    const [date, setDate] = useState(new Date());
    const [recipes, setRecipes] = useState({});
    const [newRecipe, setNewRecipe] = useState('');

    const displayDate = selectedDate ? new Date(selectedDate) : date;


    const onDateChange = (newDate) => {
        setDate(newDate);
    };

    const addRecipe = () => {
        const dateString = date.toDateString();
        setRecipes({
            ...recipes,
            [dateString]: newRecipe,
        });
        setNewRecipe('');
    };

    const deleteRecipe = (date) => {
        const updatedRecipes = { ...recipes };
        delete updatedRecipes[date];
        setRecipes(updatedRecipes);
    };

    return (
        <div>
            <h1>Meal Planner</h1>
            <Calendar onChange={onDateChange} value={date} />
            <div>
                <h2>Selected Date: {date.toDateString()}</h2>
                <input
                    type="text"
                    value={newRecipe}
                    onChange={(e) => setNewRecipe(e.target.value)}
                    placeholder="Add a recipe"
                />
                <button onClick={addRecipe}>Add Recipe</button>
            </div>
            <div>
                <h2>Recipes</h2>
                <ul>
                    {Object.keys(recipes).map((key) => (
                        <li key={key}>
                            {key}: {recipes[key]}
                            <button onClick={() => deleteRecipe(key)}>Delete</button>
                        </li>
                    ))}
                </ul>
                {recipe && selectedDate && mealType && (
                                <div>
                                    <h2>Received from RecipeDetail</h2>
                                    <p>Recipe Name: {recipe.Name}</p>
                                    <p>Selected Date: {displayDate.toDateString()}</p>
                                    <p>Meal Type: {mealType}</p>
                                    <p>Description: {recipe.Description}</p>
                                    <p>Cook Time: {recipe.CookTime}</p>
                                    <p>Prep Time: {recipe.PrepTime}</p>
                                    <p>Total Time: {recipe.TotalTime}</p>
                                    <p>Calories: {recipe.Calories}</p>
                                    {/* Add more fields as needed */}
                                </div>
                            )}
            </div>
        </div>
    );
    
};

export default MealPlanner;

