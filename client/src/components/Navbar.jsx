import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="logo">
                🍴 RecipeHub
            </div>

            {/* Navigation Links */}
            <div className="nav-links">

                <Link to="/">
                    🏠 Home
                </Link>

                <Link to="/recipes">
                    🍴 Recipes
                </Link>

                <Link to="/add-recipe">
                    ➕ Add Recipe
                </Link>

                <Link to="/favorites">
                    ❤️ Favorites
                </Link>

                <Link to="/dashboard">
                    📊 Dashboard
                </Link>

                <Link to="/login">
                    🔐 Login
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;