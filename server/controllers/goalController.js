const asyncHandler  = require("express-async-handler");

const Goal          = require('../models/goalModel');
const User          = require('../models/userModel');

// @desc  Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    // Returns the entire list of Goals when successful.
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals);
})

// @desc  Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {

    // If the goal doesn't have a text field, return an error message.
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add content to the text field.');
    }

    // Creates a goal with text equal to the body.text of the request and stores the user who created it.
    const goal = await Goal.create({ 
        text: req.body.text,
        user: req.user.id,
    })

    // Responds with object of the goal which was created
    res.status(200).json(goal);
})

// @desc  Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    // Finds the entry which matches the id from the URL
    const goal = await Goal.findById(req.params.id);

    // Return an error if the goal is not found
    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }


    // If not logged in, return an error message.
    if(!req.user) {
        res.status(401);
        throw new Error('No user found, please log in.');
    }

    // Make sure logged in user matches the goal's owner
    if(goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to modify this post.');
    }

    // Finds and updates the specific entry based on the ID, using the body of the request. 
    // {new: true} creates a new entry if there is no matching entry to update
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Returns the object of the goal that was updated
    res.status(200).json(updatedGoal);
})


// @desc  Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    // Finds and deletes the goal with the request's ID parameter
    const goal = await Goal.findByIdAndDelete(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    // If not logged in, return an error message.
    if(!req.user) {
        res.status(401);
        throw new Error('No user found, please log in.');
    }

    // Make sure logged in user matches the goal's owner
    if(goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to modify this post.');
    }

    await goal.remove();

    // Returns the ID of the deleted item
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getGoals, 
    setGoal, 
    updateGoal, 
    deleteGoal,
}