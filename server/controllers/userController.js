const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // If any of the elements are missing, return an error
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please complete all fields.');
    }

    // Check if user exists in the database already
    const userExists = await User.findOne({email});

    // If the user already exists, return an error.
    if (userExists) {
        res.status(400);
        throw new Error('User already exists in database');
    }

    // Generate a salt, take the salt and use it with the plaintext password to create the hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    // If all valid arguments have been provided, respond with the user object.
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        // If not, return an error.
        res.status(400);
        throw new Error('Invalid user data, please make sure all fields are completed.');
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Search for the user by their email address
    const user = await User.findOne({email});

    // If the user is in the database and the password is correct, respond with the user object and token.
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        // If user does not exist in the database, return an error
        res.status(400);
        throw new Error('Invalid credentials.  Create an account?');
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {

    // Respond with your user information
    res.status(200).json(req.user)
})

// Generate JSON Web Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { 
    registerUser, 
    loginUser,
    getMe,
}