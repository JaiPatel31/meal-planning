// RecipeDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Select, Modal, Button } from 'antd';

const { Option } = Select;

    const RecipeDetail = () => {
      const { id } = useParams();
      const [recipe, setRecipe] = useState(null);
      const [loading, setLoading] = useState(true);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [selectedDate, setSelectedDate] = useState(null);
      const [mealType, setMealType] = useState(null);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchRecipe = async () => {
          try {
            const response = await axios.get(`http://localhost:5001/api/recipes/${id}`);
            setRecipe(response.data);
          } catch (error) {
            console.error('Error fetching recipe:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchRecipe();
      }, [id]);

      const showModal = () => {
        setIsModalVisible(true);
      };

      const handleOk = () => {
        setIsModalVisible(false);
        navigate('/mealplanner', { state: { recipe, selectedDate, mealType } });
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const handleDateChange = (date) => {
        setSelectedDate(date ? date.toISOString() : null);
      };

      const handleMealTypeChange = (value) => {
        setMealType(value);
      };

      if (loading) return <div>Loading...</div>;

      if (!recipe) return <div>Recipe not found.</div>;

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
          <Modal title="Select Date and Meal Type" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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