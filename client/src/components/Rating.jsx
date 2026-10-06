import { useState } from "react";

function Rating({ recipeId }) {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);

        const savedRatings =
            JSON.parse(localStorage.getItem("recipeRatings")) || {};

        savedRatings[recipeId] = value;

        localStorage.setItem(
            "recipeRatings",
            JSON.stringify(savedRatings)
        );
    };

    return (
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
                <button
                    type="button"
                    onClick={() => handleRating(1)}
                    style={{
                        fontSize: "35px",
                        border: "none",
                        background: "none",
                        cursor: "pointer"
                    }}
                >
                    {rating >= 1 ? "⭐" : "☆"}
                </button>

                <button
                    type="button"
                    onClick={() => handleRating(2)}
                    style={{
                        fontSize: "35px",
                        border: "none",
                        background: "none",
                        cursor: "pointer"
                    }}
                >
                    {rating >= 2 ? "⭐" : "☆"}
                </button>

                <button
                    type="button"
                    onClick={() => handleRating(3)}
                    style={{
                        fontSize: "35px",
                        border: "none",
                        background: "none",
                        cursor: "pointer"
                    }}
                >
                    {rating >= 3 ? "⭐" : "☆"}
                </button>

                <button
                    type="button"
                    onClick={() => handleRating(4)}
                    style={{
                        fontSize: "35px",
                        border: "none",
                        background: "none",
                        cursor: "pointer"
                    }}
                >
                    {rating >= 4 ? "⭐" : "☆"}
                </button>

                <button
                    type="button"
                    onClick={() => handleRating(5)}
                    style={{
                        fontSize: "35px",
                        border: "none",
                        background: "none",
                        cursor: "pointer"
                    }}
                >
                    {rating >= 5 ? "⭐" : "☆"}
                </button>
            </div>

            <p>
                {rating === 0
                    ? "Click a star to rate this recipe"
                    : `Your rating: ${rating}/5`}
            </p>
        </div>
    );
}

export default Rating;