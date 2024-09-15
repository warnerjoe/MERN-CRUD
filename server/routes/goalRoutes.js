const express       = require('express');
const router        = express.Router();
const { 
    getGoals, 
    setGoal, 
    updateGoal, 
    deleteGoal}     = require('../controllers/goalController')

// Shortcut so that /api/goals GET / POST requests use the right controller, and DELETE and PUT using the api/goals/:id
router.route('/').get(getGoals).post(setGoal)
router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router;