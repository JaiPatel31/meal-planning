import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MealPlanner.css';

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
    <div className='meal-planner-main-container'>
      <div className='meal-planner-container'>
        <div className='meal-planner-content'>
          <h2>Selected Date: {date.toDateString()}</h2>
          <h3>Saved Meals</h3>
          <ul>
            {mealsForSelectedDate.length > 0 ? (
              mealsForSelectedDate.map((meal) => (
                <li key={meal._id}>
                  <Link to={`/recipes/${meal.recipe._id}`} className='link-item'>
                    {meal.recipe?.Name || "Unnamed Recipe"} - {meal.mealType}
                  </Link>
                  <button onClick={() => handleDelete(meal._id)} className='delete-button'>Delete</button>
                </li>
              ))
            ) : (
              <p>No meals saved for this date.</p>
            )}
          </ul>

          {/* Button to go back to Recipe List */}
          <button onClick={goBackToRecipeList} className='back-button'>
            Back to Recipe List
          </button>
        </div>
        <div>
          <Calendar onChange={onDateChange} value={date} className='meal-planner-calendar'/>
        </div>
      </div>
      <div className='footer'>
                <div className='footer-content'>
                    <div className='footer-left'>
                        <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1730144316/Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo_processed_yb2a5y.png" alt="Meal Planning App Logo" className='footer-logo'/>
                        <h1>SavvyEats</h1>
                    </div>
                    <div className='footer-right'>
                        <a href='/blog' className='footer-text'>Blog</a>
                        <a href='/meal-plans' className='footer-text'>Meal Plans</a>
                        <a href='/recipes' className='footer-text'>Recipes</a>
                        <a href='/about-us' className='footer-text'>About Us</a>
                        <a href='/footer-text' className='footer-text'>Contact Us</a>
                        <a href='/register' className='footer-text'>Get Started</a>
                    </div>
                    <hr className='footer-line'/>
                    <div className='footer-bottom'>
                        <p>&copy; 2024 SavvyEats. All rights reserved.</p>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default MealPlanner;
