function RecipeCard({
    recipe,
    isFavorite,
    toggleFavorite
}) {
    return (
        <div className="recipe-card">

            <img
                src={recipe.image}
                alt={recipe.name}
            />

            <div className="recipe-card-content">

                <h2>{recipe.name}</h2>

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

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "15px"
                    }}
                >

                    <a
                        href={`/recipes/${recipe.id}`}
                        className="hero-button"
                        style={{
                            padding: "10px 15px"
                        }}
                    >
                        View Recipe
                    </a>

                    <button
                        onClick={() =>
                            toggleFavorite(recipe)
                        }
                        style={{
                            border: "none",
                            background: "transparent",
                            fontSize: "28px",
                            cursor: "pointer"
                        }}
                        title={
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        {isFavorite
                            ? "❤️"
                            : "🤍"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default RecipeCard;