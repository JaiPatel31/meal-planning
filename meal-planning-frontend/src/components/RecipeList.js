import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import "./RecipeList.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/recipes", {
          params: { page: currentPage, limit: 30 },
        });
        setRecipes(response.data.recipes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="recipe-main-container">
      <div className="recipe-container">
        {recipes.map((recipe) => {
          const imageUrls = recipe.Images || [];
          const imageUrl = Array.isArray(imageUrls) && imageUrls.length > 0 ? imageUrls[0] : "https://res.cloudinary.com/dujmpn87j/image/upload/v1730144316/Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo_processed_yb2a5y.png";
          return (
            <a href={`/recipes/${recipe._id}`} className="recipe-a-tag">
              <div key={recipe._id} className="recipe-sub-container">
                <div className="recipe-image-container">
                  <img
                    src={imageUrl}
                    alt={recipe.Name}
                    className="recipe-image"
                  />
                </div>
                <p className="recipe-title">{recipe.Name}</p>
              </div>
            </a>
          );
        })}
      </div>
      <div className="footer-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="left-button">
          <i className="bi bi-chevron-left"></i>
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="right-button">
          <i className="bi bi-chevron-right"></i>
        </button>
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
}

export default RecipeList;