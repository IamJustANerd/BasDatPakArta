const express = require('express');
const router = express.Router();
const passport = require('passport');
const socialController = require('../controller/social');

router.post(`/like`, passport.authenticate('jwt', {session: false}), socialController.likeRecipe);
router.post(`/unlike`, passport.authenticate('jwt', {session: false}), socialController.unlikeRecipe);
router.post(`/comment`, passport.authenticate('jwt', {session: false}), socialController.commentOnRecipe);
router.post(`/follow`, passport.authenticate('jwt', {session: false}), socialController.followUser);
router.post(`/unfollow`, passport.authenticate('jwt', {session: false}), socialController.unfollowUser);
router.get(`/view_comments`, socialController.viewComments);
router.post(`/view_followers`, socialController.viewFollowers);
router.post(`/view_following`, socialController.viewFollowing);

module.exports = router;