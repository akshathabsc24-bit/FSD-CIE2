import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">

            {/* Hero Section */}
            <section className="hero">

                <div className="hero-content">

                    <p
                        style={{
                            color: "#ff7043",
                            fontWeight: "bold",
                            fontSize: "15px"
                        }}
                    >
                        🍳 SMART RECIPE MANAGEMENT SYSTEM
                    </p>

                    <h1>
                        Discover.
                        <br />
                        Cook.
                        <br />
                        Enjoy.
                    </h1>

                    <p>
                        Welcome to RecipeHub — your smart place
                        to discover, manage, save and rate
                        delicious recipes.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "wrap"
                        }}
                    >

                        <Link
                            to="/recipes"
                            className="hero-button"
                        >
                            🍴 Explore Recipes
                        </Link>

                        <Link
                            to="/add-recipe"
                            className="hero-button"
                            style={{
                                backgroundColor: "#ff9800"
                            }}
                        >
                            ➕ Add Your Recipe
                        </Link>

                    </div>

                </div>

                <img
                    className="hero-image"
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
                    alt="Delicious food"
                />

            </section>

            {/* Features Section */}
            <section
                style={{
                    marginTop: "50px"
                }}
            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    <h2>
                        ✨ Everything You Need
                    </h2>

                    <p>
                        Manage your recipes easily with
                        RecipeHub.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px"
                    }}
                >

                    {/* Feature 1 */}
                    <div
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "15px",
                            textAlign: "center",
                            boxShadow:
                                "0 5px 18px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h2>🍴</h2>

                        <h3>
                            Manage Recipes
                        </h3>

                        <p>
                            Add, edit, view and delete
                            your favorite recipes.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "15px",
                            textAlign: "center",
                            boxShadow:
                                "0 5px 18px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h2>🔍</h2>

                        <h3>
                            Search & Filter
                        </h3>

                        <p>
                            Quickly find recipes using
                            search and category filters.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "15px",
                            textAlign: "center",
                            boxShadow:
                                "0 5px 18px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h2>❤️</h2>

                        <h3>
                            Save Favorites
                        </h3>

                        <p>
                            Keep your favorite recipes
                            in one convenient place.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "15px",
                            textAlign: "center",
                            boxShadow:
                                "0 5px 18px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h2>⭐</h2>

                        <h3>
                            Rate Recipes
                        </h3>

                        <p>
                            Give recipes a rating from
                            1 to 5 stars.
                        </p>
                    </div>

                </div>

            </section>

            {/* Call To Action */}
            <section
                style={{
                    marginTop: "50px",
                    marginBottom: "30px",
                    padding: "40px 25px",
                    borderRadius: "18px",
                    textAlign: "center",
                    background:
                        "linear-gradient(135deg, #fff0e6, #fff8e1)"
                }}
            >

                <h2>
                    👨‍🍳 Ready to Start Cooking?
                </h2>

                <p
                    style={{
                        margin: "12px 0 20px"
                    }}
                >
                    Explore delicious recipes or
                    create your own recipe today.
                </p>

                <Link
                    to="/recipes"
                    className="hero-button"
                >
                    🚀 Get Started
                </Link>

            </section>

        </div>
    );
}

export default Home;