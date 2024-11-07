import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';

const MealPlanner = () => {
  const navigate = useNavigate();
  const [savedMeals, setSavedMeals] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchSavedMeals = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/mealplans', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Now fetch the recipe for each saved meal
        const mealsWithRecipeData = await Promise.all(
          response.data.map(async (meal) => {
            // Fetch recipe details using meal.recipe (which is an ObjectId)
            const recipeResponse = await axios.get(`http://localhost:5001/api/recipes/${meal.recipe}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            return {
              ...meal,
              recipe: recipeResponse.data, // Attach the fetched recipe data to the meal
            };
          })
        );

        setSavedMeals(mealsWithRecipeData);
      } catch (error) {
        console.error('Error fetching saved meals:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchSavedMeals();
  }, [navigate]);

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  // Filter meals to show only those matching the selected date
  const mealsForSelectedDate = savedMeals.filter((meal) => {
    const mealDate = new Date(meal.selectedDate).toDateString();
    return mealDate === date.toDateString();
  });

  // Function to handle meal deletion
  const handleDelete = async (mealId) => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      alert('You need to be logged in to delete a meal.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/mealplans/${mealId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted meal from the list
      setSavedMeals(savedMeals.filter(meal => meal._id !== mealId));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  // Navigate back to Recipe List
  const goBackToRecipeList = () => {
    navigate('/recipelist');
  };

  return (
    <div>
      <h1>Meal Planner</h1>
      <Calendar onChange={onDateChange} value={date} />
      <h2>Selected Date: {date.toDateString()}</h2>
      <h3>Saved Meals</h3>
      <ul>
        {mealsForSelectedDate.length > 0 ? (
          mealsForSelectedDate.map((meal) => (
            <li key={meal._id}>
              <Link to={`/recipes/${meal.recipe._id}`}>
                {meal.recipe?.Name || "Unnamed Recipe"} - {meal.mealType}
              </Link>
              <button onClick={() => handleDelete(meal._id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))
        ) : (
          <p>No meals saved for this date.</p>
        )}
      </ul>

      {/* Button to go back to Recipe List */}
      <button onClick={goBackToRecipeList} style={{ marginTop: '20px' }}>
        Back to Recipe List
      </button>
    </div>
  );
};

export default MealPlanner;
