const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    followers: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    following: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    recipesCreated: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    recipesLiked: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;