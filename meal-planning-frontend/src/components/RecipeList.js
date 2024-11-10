import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Link } from "react-router-dom"; // Import Link
import "./RecipeList.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
=======
import { Link, useLocation, useNavigate } from "react-router-dom";
>>>>>>> 397e026ad39c4bfd1c14af51e48a55d757ba3ef2

function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState({}); // Track loading state for each image

  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook

  // UseEffect to read the `page` query parameter from the URL when the location changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(queryParams.get("page")) || 1; // Default to 1 if not present
    setCurrentPage(pageFromUrl);
  }, [location.search]); // Re-run when location.search (query) changes

  // Fetch recipes whenever `currentPage` changes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      try {
        const response = await axios.get("http://localhost:5001/api/recipes", {
          params: { page: currentPage, limit: 30 },
        });

        // Fetch recipes and handle image generation
        const fetchedRecipes = await Promise.all(
          response.data.recipes.map(async (recipe) => {
            // Check if images exist, otherwise generate them
            if (!recipe.Images || recipe.Images.length === 0) {
              setImageLoading((prevState) => ({ ...prevState, [recipe._id]: true }));
              const generatedImage = await generateImage(recipe._id, recipe.Name);
              setImageLoading((prevState) => ({ ...prevState, [recipe._id]: false }));
              return { ...recipe, Images: [generatedImage] };
            }
            return recipe;
          })
        );

        setRecipes(fetchedRecipes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage]); // Refetch recipes when the page changes

  const generateImage = async (recipeId, recipeTitle) => {
    try {
      const timeout = 5000; // Set timeout to 5 seconds (5000ms)
      
      // Create a promise that will reject after the timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Image generation timed out")), timeout)
      );

      // Create a race between the image generation and the timeout
      const imageGenerationPromise = axios.post("http://localhost:5001/api/images/generate-image", {
        recipeId,
        recipeTitle,
      }).then(response => response.data.imageUrl);

      // Use Promise.race to reject the promise if the timeout occurs first
      const imageUrl = await Promise.race([imageGenerationPromise, timeoutPromise]);

      return imageUrl; // Return the image URL if generated within time limit
    } catch (error) {
      console.error("Error generating image:", error);
      return "https://res.cloudinary.com/dujmpn87j/image/upload/v1730144316/Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo_processed_yb2a5y.png"; // Fallback image URL
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      navigate(`?page=${nextPage}`); // Update URL with next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`?page=${prevPage}`); // Update URL with previous page
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div>
      <h1>Recipes</h1>
      {loading ? (
        <p>Loading...</p> // Show loading text or spinner while fetching
      ) : (
        recipes.map((recipe) => {
          const imageUrls = recipe.Images || [];
          const imageUrl = imageUrls.length > 0 ? imageUrls[0] : "https://fallbackimage.com/image.png";

          // If the image is still loading, show the placeholder
          const displayImage = imageLoading[recipe._id]
            ? "https://fallbackimage.com/placeholder.png" // Placeholder image URL
            : imageUrl;

          return (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
              <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
                <img
                  src={displayImage}
                  alt={recipe.Name}
                  style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                />
                <h1>{recipe.Name}</h1>
              </div>
            </Link>
          );
        })
      )}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
>>>>>>> 397e026ad39c4bfd1c14af51e48a55d757ba3ef2
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="right-button">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
<<<<<<< HEAD
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
=======

      {/* Disclaimer */}
      <footer style={{ marginTop: "20px", textAlign: "center", fontStyle: "italic", fontSize: "0.9em" }}>
        <p><strong>Disclaimer:</strong> Some images are AI-generated and may not be accurate representations of real-life food.</p>
      </footer>
>>>>>>> 397e026ad39c4bfd1c14af51e48a55d757ba3ef2
    </div>
  );
}

export default RecipeList;
