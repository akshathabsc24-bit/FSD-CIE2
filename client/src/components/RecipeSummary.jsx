import { Component } from "react";

class RecipeSummary extends Component {
    render() {
        return (
            <div className="recipe-summary">
                <h2>📊 Recipe Summary</h2>

                <p>Total Recipes: {this.props.totalRecipes}</p>

                <p>Total Favorites: {this.props.totalFavorites}</p>
            </div>
        );
    }
}

export default RecipeSummary;