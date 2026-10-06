import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    const [ratings, setRatings] = useState({});

    // Get recipes
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/recipes")
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
            });
    }, []);

    // Get ratings from localStorage
    useEffect(() => {
        const loadRatings = () => {
            const savedRatings =
                JSON.parse(
                    localStorage.getItem("recipeRatings")
                ) || {};

            setRatings(savedRatings);
        };

        loadRatings();

        window.addEventListener(
            "storage",
            loadRatings
        );

        return () => {
            window.removeEventListener(
                "storage",
                loadRatings
            );
        };
    }, []);

    // Count favorites
    const savedFavorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    const totalFavorites = savedFavorites.length;

    // Total ratings
    const totalRatings = Object.keys(ratings).length;

    // Calculate average rating
    const ratingValues = Object.values(ratings);

    const averageRating =
        ratingValues.length > 0
            ? (
                  ratingValues.reduce(
                      (sum, rating) =>
                          sum + Number(rating),
                      0
                  ) / ratingValues.length
              ).toFixed(1)
            : "0.0";

    // Category count
    const categoryCount = {};

    recipes.forEach((recipe) => {
        if (categoryCount[recipe.category]) {
            categoryCount[recipe.category]++;
        } else {
            categoryCount[recipe.category] = 1;
        }
    });

    return (
        <div className="container">

            <h1>📊 RecipeHub Dashboard</h1>

            <p>
                Welcome to your RecipeHub dashboard!
            </p>

            {/* Statistics */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "20px",
                    marginTop: "25px",
                    marginBottom: "35px"
                }}
            >

                {/* Total Recipes */}
                <div
                    style={{
                        padding: "25px",
                        borderRadius: "12px",
                        backgroundColor: "#f5f5f5",
                        textAlign: "center"
                    }}
                >
                    <h2>🍴</h2>

                    <h2>{recipes.length}</h2>

                    <p>Total Recipes</p>
                </div>

                {/* Favorites */}
                <div
                    style={{
                        padding: "25px",
                        borderRadius: "12px",
                        backgroundColor: "#f5f5f5",
                        textAlign: "center"
                    }}
                >
                    <h2>❤️</h2>

                    <h2>{totalFavorites}</h2>

                    <p>Favorite Recipes</p>
                </div>

                {/* Categories */}
                <div
                    style={{
                        padding: "25px",
                        borderRadius: "12px",
                        backgroundColor: "#f5f5f5",
                        textAlign: "center"
                    }}
                >
                    <h2>📂</h2>

                    <h2>
                        {Object.keys(categoryCount).length}
                    </h2>

                    <p>Categories</p>
                </div>

                {/* Average Rating */}
                <div
                    style={{
                        padding: "25px",
                        borderRadius: "12px",
                        backgroundColor: "#fff8e1",
                        textAlign: "center"
                    }}
                >
                    <h2>⭐</h2>

                    <h2>{averageRating}/5</h2>

                    <p>Average Rating</p>
                </div>

            </div>

            {/* Rating Information */}
            <div
                style={{
                    padding: "20px",
                    marginBottom: "30px",
                    borderRadius: "12px",
                    backgroundColor: "#fff8e1"
                }}
            >
                <h2>⭐ Rating Summary</h2>

                <p>
                    Recipes Rated:{" "}
                    <strong>{totalRatings}</strong>
                </p>

                <p>
                    Average Rating:{" "}
                    <strong>{averageRating}/5</strong>
                </p>
            </div>

            {/* Categories */}
            <div className="recipe-details-section">

                <h2>📂 Categories</h2>

                {Object.entries(categoryCount).map(
                    ([category, count]) => (
                        <p key={category}>
                            <strong>{category}</strong>:{" "}
                            {count} recipe
                            {count !== 1 ? "s" : ""}
                        </p>
                    )
                )}

            </div>

            {/* Recent Recipes */}
            <div className="recipe-details-section">

                <h2>🕒 Recent Recipes</h2>

                {recipes.length === 0 ? (
                    <p>No recipes available.</p>
                ) : (
                    recipes
                        .slice()
                        .reverse()
                        .map((recipe) => (
                            <div
                                key={recipe.id}
                                style={{
                                    padding: "15px",
                                    marginBottom: "10px",
                                    borderRadius: "8px",
                                    backgroundColor: "#f5f5f5"
                                }}
                            >
                                <strong>
                                    {recipe.name}
                                </strong>

                                <span>
                                    {" "}
                                    — {recipe.category}
                                </span>

                                {ratings[recipe.id] && (
                                    <span>
                                        {" "}
                                        ⭐{" "}
                                        {ratings[recipe.id]}/5
                                    </span>
                                )}
                            </div>
                        ))
                )}

            </div>

        </div>
    );
}

export default Dashboard;