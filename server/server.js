const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(
    __dirname,
    "data",
    "recipes.json"
);

function getRecipes() {
    try {
        const data = fs.readFileSync(
            DATA_FILE,
            "utf-8"
        );

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Error reading recipes.json:",
            error
        );

        return [];
    }
}

function saveRecipes(recipes) {

    try {

        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify(
                recipes,
                null,
                2
            )
        );

    } catch (error) {

        console.error(
            "Error saving recipes.json:",
            error
        );

        throw error;
    }
}


// ==============================
// HOME
// ==============================

app.get("/", (req, res) => {

    res.json({
        message: "RecipeHub API is running!"
    });

});


// ==============================
// GET ALL RECIPES
// ==============================

app.get("/api/recipes", (req, res) => {

    console.log("GET /api/recipes");

    const recipes = getRecipes();

    res.json(recipes);

});


// ==============================
// GET SINGLE RECIPE
// ==============================

app.get("/api/recipes/:id", (req, res) => {

    console.log(
        "GET /api/recipes/" +
        req.params.id
    );

    const recipes = getRecipes();

    const recipe = recipes.find(
        (item) =>
            Number(item.id) ===
            Number(req.params.id)
    );

    if (!recipe) {

        return res.status(404).json({
            message: "Recipe not found"
        });

    }

    res.json(recipe);

});


// ==============================
// ADD RECIPE
// ==============================

app.post("/api/recipes", (req, res) => {

    console.log("");
    console.log("==============================");
    console.log("POST REQUEST RECEIVED");
    console.log("==============================");

    try {

        const recipes = getRecipes();

        const {
            name,
            category,
            difficulty,
            cookingTime,
            servings,
            ingredients,
            instructions,
            image
        } = req.body;


        if (
            !name ||
            !category ||
            !difficulty ||
            !cookingTime ||
            !servings ||
            !ingredients ||
            !instructions
        ) {

            return res.status(400).json({
                message:
                    "Please fill all required fields"
            });

        }


        let ingredientList;

        if (Array.isArray(ingredients)) {

            ingredientList = ingredients;

        } else {

            ingredientList = ingredients
                .split("\n")
                .map(
                    (item) => item.trim()
                )
                .filter(
                    (item) => item !== ""
                );

        }


        let instructionList;

        if (Array.isArray(instructions)) {

            instructionList = instructions;

        } else {

            instructionList = instructions
                .split("\n")
                .map(
                    (item) => item.trim()
                )
                .filter(
                    (item) => item !== ""
                );

        }


        const newId =
            recipes.length > 0
                ? Math.max(
                    ...recipes.map(
                        (recipe) =>
                            Number(recipe.id)
                    )
                ) + 1
                : 1;


        const newRecipe = {

            id: newId,

            name: name,

            category: category,

            difficulty: difficulty,

            cookingTime:
                Number(cookingTime),

            servings:
                Number(servings),

            ingredients:
                ingredientList,

            instructions:
                instructionList,

            image:
                image ||
                "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
        };


        recipes.push(newRecipe);

        saveRecipes(recipes);


        console.log(
            "Recipe saved successfully!"
        );


        res.status(201).json({

            message:
                "Recipe added successfully",

            recipe:
                newRecipe

        });


    } catch (error) {

        console.error(
            "POST ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Server error while adding recipe",

            error:
                error.message

        });

    }

});


// ==============================
// UPDATE RECIPE
// ==============================

app.put("/api/recipes/:id", (req, res) => {

    console.log(
        "PUT /api/recipes/" +
        req.params.id
    );

    try {

        const recipes = getRecipes();

        const recipeIndex =
            recipes.findIndex(
                (item) =>
                    Number(item.id) ===
                    Number(req.params.id)
            );


        if (recipeIndex === -1) {

            return res.status(404).json({
                message: "Recipe not found"
            });

        }


        const {
            name,
            category,
            difficulty,
            cookingTime,
            servings,
            ingredients,
            instructions,
            image
        } = req.body;


        const updatedRecipe = {

            id:
                recipes[recipeIndex].id,

            name:
                name,

            category:
                category,

            difficulty:
                difficulty,

            cookingTime:
                Number(cookingTime),

            servings:
                Number(servings),

            ingredients:
                Array.isArray(ingredients)
                    ? ingredients
                    : ingredients
                        .split("\n")
                        .map(
                            (item) =>
                                item.trim()
                        )
                        .filter(
                            (item) =>
                                item !== ""
                        ),

            instructions:
                Array.isArray(instructions)
                    ? instructions
                    : instructions
                        .split("\n")
                        .map(
                            (item) =>
                                item.trim()
                        )
                        .filter(
                            (item) =>
                                item !== ""
                        ),

            image:
                image ||
                recipes[recipeIndex].image

        };


        recipes[recipeIndex] =
            updatedRecipe;


        saveRecipes(recipes);


        res.json({

            message:
                "Recipe updated successfully",

            recipe:
                updatedRecipe

        });


    } catch (error) {

        console.error(
            "PUT ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Server error while updating recipe",

            error:
                error.message

        });

    }

});


// ==============================
// DELETE RECIPE
// ==============================

app.delete("/api/recipes/:id", (req, res) => {

    console.log(
        "DELETE /api/recipes/" +
        req.params.id
    );

    try {

        const recipes = getRecipes();

        const recipeIndex =
            recipes.findIndex(
                (item) =>
                    Number(item.id) ===
                    Number(req.params.id)
            );


        if (recipeIndex === -1) {

            return res.status(404).json({
                message: "Recipe not found"
            });

        }


        const deletedRecipe =
            recipes[recipeIndex];


        recipes.splice(
            recipeIndex,
            1
        );


        saveRecipes(recipes);


        res.json({

            message:
                "Recipe deleted successfully",

            recipe:
                deletedRecipe

        });


    } catch (error) {

        console.error(
            "DELETE ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Server error while deleting recipe",

            error:
                error.message

        });

    }

});


// ==============================
// START SERVER
// ==============================

app.listen(
    PORT,
    () => {

        console.log("");

        console.log(
            "================================="
        );

        console.log(
            "RecipeHub Backend Server"
        );

        console.log(
            "Server running at:"
        );

        console.log(
            `http://localhost:${PORT}`
        );

        console.log(
            "================================="
        );

    }
);