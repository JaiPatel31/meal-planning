import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/recipes", {
          params: { page: currentPage, limit: 10 },
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
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => {
        const imageUrls = recipe.Images || [];
        const imageUrl = Array.isArray(imageUrls) && imageUrls.length > 0 ? imageUrls[0] : "https://res.cloudinary.com/dujmpn87j/image/upload/v1730144316/Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo_processed_yb2a5y.png";

        return (
          <div key={recipe._id} style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
            <img
              src={imageUrl}
              alt={recipe.Name}
              style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
            />
            <div>
              <h3>
                <Link to={`/recipes/${recipe._id}`}>{recipe.Name}</Link> {/* Link to RecipeDetail using ObjectID */}
              </h3>
              <button>Add to Meal Plan</button>
            </div>
          </div>
        );
      })}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default RecipeList;
