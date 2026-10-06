import { useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
    const [favorites] = useState(() => {
        const saved = localStorage.getItem("favorites");

        if (!saved) {
            return [];
        }

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.log("Favorites error:", error);
            return [];
        }
    });

    const removeFavorite = (recipeId) => {
        const updatedFavorites = favorites.filter(
            (recipe) => recipe.id !== recipeId
        );

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );

        window.location.reload();
    };

    return (
        <div className="container">

            <h1>❤️ My Favorite Recipes</h1>

            <p>
                Your saved recipes are shown here.
            </p>

            {favorites.length === 0 ? (
                <div className="empty-favorites">

                    <h2>No Favorites Yet</h2>

                    <p>
                        Go to the Recipes page and click ❤️
                        to add a recipe.
                    </p>

                </div>
            ) : (
                <div className="recipe-grid">

                    {favorites.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={true}
                            onToggleFavorite={() =>
                                removeFavorite(recipe.id)
                            }
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default Favorites;