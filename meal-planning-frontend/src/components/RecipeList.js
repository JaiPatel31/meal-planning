import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
          params: { page: currentPage, limit: 10 },
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
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Disclaimer */}
      <footer style={{ marginTop: "20px", textAlign: "center", fontStyle: "italic", fontSize: "0.9em" }}>
        <p><strong>Disclaimer:</strong> Some images are AI-generated and may not be accurate representations of real-life food.</p>
      </footer>
    </div>
  );
}

export default RecipeList;
