import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/recipes/${id}`)
            .then((response) => {
                setRecipe(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="container">
                <h2>Loading recipe...</h2>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="container">
                <h2>Recipe not found</h2>

                <button
                    onClick={() => navigate("/recipes")}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    ← Back to Recipes
                </button>
            </div>
        );
    }

    const savedRatings =
        JSON.parse(localStorage.getItem("recipeRatings")) || {};

    const currentRating = savedRatings[id] || 0;

    const saveRating = (value) => {
        savedRatings[id] = value;

        localStorage.setItem(
            "recipeRatings",
            JSON.stringify(savedRatings)
        );

        window.location.reload();
    };

    return (
        <div className="container recipe-details">

            {/* Back Button */}
            <button
                onClick={() => navigate("/recipes")}
                style={{
                    marginBottom: "20px",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                ← Back to Recipes
            </button>

            {/* Recipe Image */}
            <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-details-image"
            />

            {/* Recipe Name */}
            <h1>{recipe.name}</h1>

            {/* Recipe Information */}
            <div className="recipe-info">

                <p>
                    <strong>Category:</strong>{" "}
                    {recipe.category}
                </p>

                <p>
                    <strong>Difficulty:</strong>{" "}
                    {recipe.difficulty}
                </p>

                <p>
                    <strong>Cooking Time:</strong>{" "}
                    {recipe.cookingTime} minutes
                </p>

                <p>
                    <strong>Servings:</strong>{" "}
                    {recipe.servings}
                </p>

            </div>

            {/* Rating */}
            <div
                style={{
                    marginTop: "25px",
                    marginBottom: "25px",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor: "#fff8e1",
                    textAlign: "center"
                }}
            >
                <h2>⭐ Rate This Recipe</h2>

                <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => saveRating(star)}
                            style={{
                                fontSize: "35px",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                padding: "5px"
                            }}
                        >
                            {star <= currentRating
                                ? "⭐"
                                : "☆"}
                        </button>
                    ))}
                </div>

                <p>
                    {currentRating === 0
                        ? "Click a star to rate this recipe"
                        : `Your rating: ${currentRating}/5`}
                </p>
            </div>

            {/* Ingredients */}
            <div className="recipe-details-section">

                <h2>🥕 Ingredients</h2>

                <ul>
                    {recipe.ingredients.map(
                        (ingredient, index) => (
                            <li key={index}>
                                {ingredient}
                            </li>
                        )
                    )}
                </ul>

            </div>

            {/* Instructions */}
            <div className="recipe-details-section">

                <h2>👨‍🍳 Instructions</h2>

                <ol>
                    {recipe.instructions.map(
                        (instruction, index) => (
                            <li key={index}>
                                {instruction}
                            </li>
                        )
                    )}
                </ol>

            </div>

            {/* Edit and Delete Buttons */}
            <div className="recipe-action-buttons">

                <button
                    className="edit-button"
                    onClick={() =>
                        navigate(
                            `/edit-recipe/${recipe.id}`
                        )
                    }
                >
                    ✏️ Edit Recipe
                </button>

                <button
                    className="delete-button"
                    onClick={async () => {

                        const confirmDelete =
                            window.confirm(
                                "Are you sure you want to delete this recipe?"
                            );

                        if (!confirmDelete) {
                            return;
                        }

                        try {
                            await axios.delete(
                                `http://localhost:5000/api/recipes/${recipe.id}`
                            );

                            alert(
                                "Recipe deleted successfully!"
                            );

                            navigate("/recipes");

                        } catch (error) {
                            console.error(error);

                            alert(
                                "Failed to delete recipe."
                            );
                        }
                    }}
                >
                    🗑️ Delete Recipe
                </button>

            </div>

        </div>
    );
}

export default RecipeDetails;