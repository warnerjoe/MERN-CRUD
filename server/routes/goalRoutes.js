const express       = require('express');
const router        = express.Router();

const { 
    getGoals, 
    setGoal, 
    updateGoal, 
    deleteGoal}     = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

// Shortcut so that /api/goals GET / POST requests use the right controller, and DELETE and PUT using the api/goals/:id, if there is a second argument that route requires user authentication.
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router;