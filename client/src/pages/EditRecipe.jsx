import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditRecipe() {
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
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:5000/api/recipes/${id}`,
                recipe
            );

            alert("Recipe updated successfully!");

            navigate(`/recipes/${id}`);

        } catch (error) {
            console.error(error);
            alert("Failed to update recipe.");
        }
    };

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
            </div>
        );
    }

    return (
        <div className="container">

            <h1>✏️ Edit Recipe</h1>

            <form onSubmit={handleUpdate}>

                <div className="form-group">
                    <label>Recipe Name</label>

                    <input
                        type="text"
                        name="name"
                        value={recipe.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={recipe.category}
                        onChange={handleChange}
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Difficulty</label>

                    <select
                        name="difficulty"
                        value={recipe.difficulty}
                        onChange={handleChange}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Cooking Time</label>

                    <input
                        type="number"
                        name="cookingTime"
                        value={recipe.cookingTime}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Servings</label>

                    <input
                        type="number"
                        name="servings"
                        value={recipe.servings}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Image URL</label>

                    <input
                        type="text"
                        name="image"
                        value={recipe.image}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="submit-recipe-button"
                >
                    💾 Update Recipe
                </button>

            </form>

        </div>
    );
}

export default EditRecipe;