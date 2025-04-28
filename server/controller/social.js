const Recipe = require('../models/Recipe');
const User = require('../models/User');

// Import necessary modules and models

// Like Recipe
const likeRecipe = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const user = await User.findById(req.user._id);
        if(user.recipesLiked.includes(recipeId)) {
            return res.status(400).json({ error: 'Recipe already liked' });
        }
        user.recipesLiked.push(recipeId);
        await user.save();

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        recipe.likes += 1;
        await recipe.save();


        res.status(200).json({ message: 'Recipe liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// unlike Recipe
const unlikeRecipe = async (req, res) => {
    try {
        const { recipeId } = req.body; 
        const user = await User.findById(req.user._id);
        if(!user.recipesLiked.includes(recipeId)) {
            return res.status(400).json({ error: 'Recipe not liked' });
        }
        user.recipesLiked = user.recipesLiked.filter((id) => id.toString() !== recipeId.toString());
        await user.save();

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        recipe.likes -= 1;
        await recipe.save();

        res.status(200).json({ message: 'Recipe unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Comment on Recipe
const commentOnRecipe = async (req, res) => {
    try {
        const { recipe_id, comment } = req.body;
        const recipe = await Recipe.findById(recipe_id);
        recipe.comments.push({ comment, user: req.user._id, username: req.user.username });
        await recipe.save();

        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// View Comments
const viewComments = async (req, res) => {
    try {
        const { recipe_id } = req.params;
        const recipe = await Recipe.findById(recipe_id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const comments = await Comment.find({ recipe: recipe_id });

        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Follow User
const followUser = async (req, res) => {
    try {
        const { user_id } = req.body;
        const follower = await User.findById(req.user._id);

        if (!follower) {
            return res.status(404).json({ error: 'follower not found' });
        }
        if (!req.user.following) {
            req.user.following = [];
        }
        if (req.user.following.includes(user_id)) {
            return res.status(400).json({ error: 'User already followed' });
        }
        req.user.following.push(user_id);
        await req.user.save();

        const followed = await User.findById(user_id);
        if (!followed) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!followed.followers) {
            followed.followers = [];
        }
        if (followed.followers.includes(req.user._id)) {
            return res.status(400).json({ error: 'User already followed' });
        }
        followed.followers.push(req.user._id);
        await followed.save();

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Unfollow User
const unfollowUser = async (req, res) => {
    try {
        const { user_id } = req.body;
        const follower = await User.findById(req.user._id);

        if (!follower) {
            return res.status(404).json({ error: 'User not found' });
        }
        if(!follower.following.includes(user_id)) {
            return res.status(400).json({ error: 'User not followed' });
        }
        req.user.following = req.user.following.filter((id) => id.toString() !== user_id);
        follower.followers = follower.followers.filter((id) => id.toString() !== req.user._id.toString());
        await req.user.save();
        await follower.save();

        const followed = await User.findById(user_id);
        if (!followed) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!followed.followers.includes(req.user._id)) {
            return res.status(400).json({ error: 'User not followed' });
        }
        followed.followers = followed.followers.filter((id) => id.toString() !== req.user._id.toString());
        await followed.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// View Followers
const viewFollowers = async (req, res) => {
    try {
        const { user_id } = req.body;
        const user = await User.findById(user_id);
        const followers = await User.find({ _id: { $in: user.followers } }, { _id: 1, username: 1, email: 1, image: 1 });
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// View Following
const viewFollowing = async (req, res) => {
    try {
        const { user_id } = req.body;
        const user = await User.findById(user_id);
        const following = await User.find({ _id: { $in: user.following } }, { _id: 1, username: 1, email: 1, image: 1 });
        res.status(200).json(following);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    likeRecipe,
    unlikeRecipe,
    commentOnRecipe,
    viewComments,
    followUser,
    unfollowUser,
    viewFollowers,
    viewFollowing,
};