const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Runs the proper functions on the proper routes, if it has a second argument of protect it will check for user auth
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;