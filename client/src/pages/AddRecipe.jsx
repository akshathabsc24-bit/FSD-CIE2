import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRecipe() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        category: "Breakfast",
        difficulty: "Easy",
        cookingTime: "",
        servings: "",
        ingredients: "",
        instructions: "",
        image: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("ADD RECIPE BUTTON CLICKED");

        console.log("Sending data:");
        console.log(formData);

        try {

            const response = await axios.post(
                "http://localhost:5000/api/recipes",
                formData
            );

            console.log(
                "SERVER RESPONSE:",
                response.data
            );

            setMessage(
                "Recipe added successfully! 🎉"
            );

            setTimeout(() => {
                navigate("/recipes");
            }, 1000);

        } catch (error) {

            console.error(
                "ADD RECIPE ERROR:",
                error
            );

            setMessage(
                "Failed to add recipe. Please try again."
            );

        }

    };

    return (

        <div className="container add-recipe-page">

            <div className="form-header">

                <h1>➕ Add New Recipe</h1>

                <p>
                    Create a delicious recipe and add it
                    to your RecipeHub collection.
                </p>

            </div>


            <form
                className="recipe-form"
                onSubmit={handleSubmit}
            >

                {/* Recipe Name */}

                <div className="form-group">

                    <label>
                        Recipe Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Example: Paneer Butter Masala"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* Category */}

                <div className="form-group">

                    <label>
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >

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

                </div>


                {/* Difficulty */}

                <div className="form-group">

                    <label>
                        Difficulty
                    </label>

                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >

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


                {/* Cooking Time */}

                <div className="form-group">

                    <label>
                        Cooking Time (minutes)
                    </label>

                    <input
                        type="number"
                        name="cookingTime"
                        value={formData.cookingTime}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                </div>


                {/* Servings */}

                <div className="form-group">

                    <label>
                        Servings
                    </label>

                    <input
                        type="number"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                </div>


                {/* Ingredients */}

                <div className="form-group">

                    <label>
                        Ingredients
                    </label>

                    <textarea
                        name="ingredients"
                        placeholder="Enter one ingredient per line"
                        value={formData.ingredients}
                        onChange={handleChange}
                        rows="7"
                        required
                    />

                </div>


                {/* Instructions */}

                <div className="form-group">

                    <label>
                        Cooking Instructions
                    </label>

                    <textarea
                        name="instructions"
                        placeholder="Enter one step per line"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows="8"
                        required
                    />

                </div>


                {/* Image */}

                <div className="form-group">

                    <label>
                        Recipe Image URL
                    </label>

                    <input
                        type="url"
                        name="image"
                        placeholder="Optional"
                        value={formData.image}
                        onChange={handleChange}
                    />

                </div>


                {/* Message */}

                {message && (

                    <div className="form-message">
                        {message}
                    </div>

                )}


                {/* Button */}

                <button
                    type="submit"
                    className="submit-recipe-button"
                >
                    🍴 Add Recipe
                </button>

            </form>

        </div>

    );

}

export default AddRecipe;