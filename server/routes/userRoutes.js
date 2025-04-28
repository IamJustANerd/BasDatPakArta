const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controller/user');

router.post('/register', userController.registerUser);
router.post(`/login`, userController.loginUser);
router.get(`/profile/:name`, userController.getUserProfile);
router.get(`/profile_by_id/:id`, userController.getUserProfileById);
router.get(`/get_user_profile_photo/:id`, userController.getUserProfilePhoto);
router.put(`/update`, passport.authenticate('jwt', {session: false}), userController.updateUserProfile);
router.put(`/change_password`, passport.authenticate('jwt', {session: false}), userController.changePassword);
router.delete(`/delete`, passport.authenticate('jwt', {session: false}), userController.deleteUser);

module.exports = router;