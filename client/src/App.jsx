import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Home Page */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* All Recipes */}
                <Route
                    path="/recipes"
                    element={<Recipes />}
                />

                {/* Recipe Details */}
                <Route
                    path="/recipes/:id"
                    element={<RecipeDetails />}
                />

                {/* Add Recipe */}
                <Route
                    path="/add-recipe"
                    element={<AddRecipe />}
                />

                {/* Edit Recipe */}
                <Route
                    path="/edit-recipe/:id"
                    element={<EditRecipe />}
                />

                {/* Favorites */}
                <Route
                    path="/favorites"
                    element={<Favorites />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;