const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Recipe = require('../models/Recipe');
const Fuse = require('fuse.js');

// Controller function to get all recipes
const getSomeRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().limit(parseInt(req.params.amount));
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' , message: error.message });
    }
};

const getMostLikedRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ likes: -1 }).limit(parseInt(req.params.amount));
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getMostRecentRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(parseInt(req.params.amount));
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
const getSomeRecipesById = async (req, res) => {
    try {
        const { ids } = req.body;
        recipes = await Recipe.find({ _id: { $in: ids } });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const searchRecipes = async (req, res) => {
    try {
        const regexQuery = new RegExp(req.params.amount, 'i');
        const recipes = await Recipe.find({ title: { $regex : regexQuery} })

        const options = {
            keys: ['title'],
            threshold: 0.3,
            includeScore: true
        };

        const fuse = new Fuse(recipes, options);
        const result = fuse.search(req.params.query);
        const matchedRecipes = result.map((recipe) => recipe.item);

        res.status(200).json(matchedRecipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, timeToCreate, difficulty, servings, image} = req.body;

        // Validate input data
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // console.log(req)

        const newRecipe = new Recipe({ 
            title,
            description,
            ingredients,
            instructions,
            timeToCreate: timeToCreate ? timeToCreate : 0,
            difficulty: difficulty ? difficulty : 0,
            servings: servings ? servings : 0,
            image : image ? image : "defaultImage",
            createdBy : req.user._id
        });

        await User.findByIdAndUpdate(req.user._id, { $push: { recipesCreated: newRecipe._id } });

        await newRecipe.save();
        res.ok = true;
        res.status(201).json({message : 'Recipe created successfully'});
    } catch (error) {
        console.error('Error creating recipe:', error); // Log the error for debugging
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

// Controller function to get a single recipe by ID
const getRecipeById = async (req, res) => {
    try {
        // console.log('ID:', req.params.id);
        const recipe = await Recipe.findById(req.params.id);
        // console.log('Recipe:', recipe);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
        // res.json({ message: 'getting a single recipe by ID route success'});
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

// Controller function to update a recipe by ID
const updateRecipeById = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, timeToCreate, difficulty, servings, image } = req.body;
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        recipe.title = title;
        recipe.description = description;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        recipe.timeToCreate = timeToCreate;
        recipe.difficulty = difficulty;
        recipe.servings = servings;
        recipe.image = image;

        await recipe.save();

        res.status(200).json({ message: 'updating a recipe by ID route success'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to delete a recipe by ID
const deleteRecipeById = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted successfully' });

        await User.findByIdAndUpdate(req.user._id, { $pull: { recipesCreated: req.params.id } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Export the controller functions
module.exports = {
    getSomeRecipes,
    getMostLikedRecipes,
    getMostRecentRecipes,
    getSomeRecipesById,
    searchRecipes,
    createRecipe,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById,
};