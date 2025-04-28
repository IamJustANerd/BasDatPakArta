const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

require('dotenv').config();
const jwtkey = process.env.JWT_KEY;

const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const newUser = new User({ username, email, password });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(savedUser => {
                            const payload = { id: savedUser.id, username: savedUser.username };
                            const token = jwt.sign(payload, jwtkey, { expiresIn: '1h' });

                            res.json({ success: true, token: `Bearer ${token}`, user: savedUser});
                        })
                        .catch(err => console.error(err));
                });
            });
        })
        .catch(err => console.error(err));
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username };
                        const token = jwt.sign(payload, jwtkey, { expiresIn: '1h' });

                        res.json({ success: true, token: `Bearer ${token}`, user: user });
                    } else {
                        res.status(400).json({ message: 'Password incorrect' });
                    }
                });
        })
        .catch(err => console.error(err));
    };

const getUserProfile = (req, res) => {
    User.findOne({ username: req.params.name })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => console.error(err));
};

const getUserProfileById = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => console.error(err));
}

const getUserProfilePhoto = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user.image);
        })
        .catch(err => console.error(err));
}

const updateUserProfile = (req, res) => {
    const { username, email, image } = req.body;

    User.findByIdAndUpdate(req.user.id, { username, email, image }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => console.error(err));
};

const changePassword = (req, res) => {
    const { currentPassword, newPassword } = req.body;

    User.findById(req.user.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            bcrypt.compare(currentPassword, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newPassword, salt, (err, hash) => {
                                if (err) throw err;
                                user.password = hash;
                                user.save()
                                    .then(updatedUser => {
                                        res.status(200).json({ message: 'Password changed successfully' });
                                    })
                                    .catch(err => console.error(err));
                            });
                        });
                    } else {
                        res.status(400).json({ message: 'Current password incorrect' });
                    }
                });
        })
        .catch(err => console.error(err));
};

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.user.id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(err => console.error(err));
};

// Export the controller functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getUserProfileById,
    getUserProfilePhoto,
    updateUserProfile,
    changePassword,
    deleteUser
};