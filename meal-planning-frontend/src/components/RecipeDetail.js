import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Select, Modal, Button, notification } from 'antd';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode

const { Option } = Select;

const RecipeDetail = () => {
  const { id } = useParams(); // Fetch the recipe ID from the URL params
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mealType, setMealType] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    // Ensure the user is authenticated before making API calls
    if (!token) {
      alert('You need to be logged in to view recipe details.');
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const userId = jwtDecode(token)._id;

    // Fetch the recipe details when the component mounts
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        notification.error({
          message: 'Error Fetching Recipe',
          description: 'Could not fetch the recipe details. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, token, navigate]);

  const showModal = () => {
    setIsModalVisible(true); // Show the modal to add to meal plan
  };

  const handleOk = async () => {
    if (!selectedDate || !mealType) {
      alert('Please select a date and meal type.');
      return;
    }

    try {
      const userId = jwtDecode(token)._id; // Use jwt_decode correctly
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,  // Attach the token to the Authorization header
        },
      };

      await axios.post("http://localhost:5001/api/mealplans", {
        userId,
        recipe,
        selectedDate,
        mealType,
      }, config);

      setIsModalVisible(false);
      notification.success({
        message: 'Meal Plan Added',
        description: 'Your recipe has been successfully added to your meal plan.',
      });
      navigate("/mealplanner");
    } catch (error) {
      console.error("Error saving meal plan:", error);
      notification.error({
        message: 'Error Adding to Meal Plan',
        description: 'There was an issue saving your meal plan. Please try again later.',
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toISOString() : null); // Set the selected date as ISO string
  };

  const handleMealTypeChange = (value) => {
    setMealType(value); // Set the selected meal type
  };

  if (loading) return <div>Loading...</div>; // Show loading state if recipe is still being fetched

  if (!recipe) return <div>Recipe not found.</div>; // Show error if recipe is not found

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

      <Button onClick={showModal}>Add to Meal Plan</Button>

      {/* Modal for selecting date and meal type */}
      <Modal
        title="Select Date and Meal Type"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DatePicker onChange={handleDateChange} />
        <Select style={{ width: '100%', marginTop: '10px' }} onChange={handleMealTypeChange}>
          <Option value="breakfast">Breakfast</Option>
          <Option value="lunch">Lunch</Option>
          <Option value="dinner">Dinner</Option>
          <Option value="snacks">Snacks</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default RecipeDetail;
