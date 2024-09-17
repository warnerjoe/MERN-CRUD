// Middleware to check for authentication on routes

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    // Create an empty token variable
    let token;

    // Tokens will always be "Bearer aklfjklfajdklfsdf", so it checks if the token begins with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header by splitting it into ['Bearer', 'token'], grab the 2nd element
            token = req.headers.authorization.split(' ')[1];

            // Verify token using JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token object
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    };

    // If there is no token, specify that in error.
    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    };
});

module.exports = {
    protect
};