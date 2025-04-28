const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [{step : String, time : Number}],
        required: true
    },
    timeToCreate:
    {
        type: Number,
        default: 0 //in minutes
    },
    difficulty:
    {
        type: Number,
        default: 0 //0 - easy; 1 - medium, 2 - hard
    },
    servings:
    {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    likes:
    {
        type: Number,
        default: 0
    },
    comments:
    {
        type: [{comment : String, user : mongoose.Schema.ObjectId, username : String}],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        immutable: true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;