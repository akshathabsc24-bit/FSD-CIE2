import { useEffect, useState } from "react";
import axios from "axios";
import RecipeSummary from "../components/RecipeSummary";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [difficulty, setDifficulty] = useState("All");

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");

        return saved ? JSON.parse(saved) : [];
    });

    const [loading, setLoading] = useState(true);

    // Get recipes from backend
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/recipes")
            .then((response) => {
                setRecipes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
                setLoading(false);
            });
    }, []);

    // Save favorites
    useEffect(() => {
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    // Add or remove favorite
    const toggleFavorite = (recipe) => {
        const alreadyFavorite = favorites.some(
            (item) => item.id === recipe.id
        );

        if (alreadyFavorite) {
            setFavorites(
                favorites.filter(
                    (item) => item.id !== recipe.id
                )
            );
        } else {
            setFavorites([
                ...favorites,
                recipe
            ]);
        }
    };

    // Search + category + difficulty
    const filteredRecipes = recipes.filter((recipe) => {

        const matchesSearch = recipe.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            recipe.category === category;

        const matchesDifficulty =
            difficulty === "All" ||
            recipe.difficulty === difficulty;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesDifficulty
        );
    });

    return (
        <div className="container">

            <h1>🍴 All Recipes</h1>

            {/* Class Component + Props */}
            <RecipeSummary
                totalRecipes={recipes.length}
                totalFavorites={favorites.length}
            />

            {/* Search */}
            <input
                type="text"
                placeholder="🔍 Search recipes..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "14px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "16px"
                }}
            />

            {/* Filters */}
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px",
                    flexWrap: "wrap"
                }}
            >

                {/* Category Filter */}
                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc"
                    }}
                >
                    <option value="All">
                        All Categories
                    </option>

                    <option value="Breakfast">
                        Breakfast
                    </option>

                    <option value="Lunch">
                        Lunch
                    </option>

                    <option value="Dinner">
                        Dinner
                    </option>

                    <option value="Dessert">
                        Dessert
                    </option>
                </select>

                {/* Difficulty Filter */}
                <select
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(e.target.value)
                    }
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc"
                    }}
                >
                    <option value="All">
                        All Difficulties
                    </option>

                    <option value="Easy">
                        Easy
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="Hard">
                        Hard
                    </option>
                </select>

            </div>

            {/* Loading */}
            {loading && (
                <p>Loading recipes...</p>
            )}

            {/* No recipes */}
            {!loading &&
                filteredRecipes.length === 0 && (
                    <p>😕 No recipes found.</p>
                )}

            {/* Recipe Cards */}
            <div className="recipe-grid">

                {!loading &&
                    filteredRecipes.map((recipe) => {

                        const isFavorite =
                            favorites.some(
                                (item) =>
                                    item.id === recipe.id
                            );

                        return (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                isFavorite={isFavorite}
                                toggleFavorite={toggleFavorite}
                            />
                        );
                    })}

            </div>

        </div>
    );
}

export default Recipes;