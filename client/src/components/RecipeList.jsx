import RecipeCard from "./RecipeCard";

function RecipeList({
    recipes,
    favorites,
    onToggleFavorite
}) {
    if (recipes.length === 0) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "50px",
                    background: "white",
                    borderRadius: "15px"
                }}
            >
                <h2>😕 No Recipes Found</h2>

                <p>
                    Try another search or category.
                </p>
            </div>
        );
    }

    return (
        <div className="recipe-grid">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favorites.some(
                        (item) =>
                            item.id === recipe.id
                    )}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
}

export default RecipeList;