const express        = require("express");
const colors         = require("colors"); // Allows color/underline/etc in console
const dotenv         = require("dotenv").config(); // Allows .env file to hold environmental varialbes
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB      = require('./config/db');
const port           = process.env.PORT || 5000;

// Runs function from /config/db.js
connectDB();

const app = express();

// Parses request and response data into JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Makes it so for any requests that go to /api/goals (or /api/goals/:id) it uses the goalRoutes file
app.use('/api/goals', require('./routes/goalRoutes'));

// Enables error handler middleware
app.use(errorHandler);

// Starts up server on port
app.listen(port, () => {
   console.log(`Server started on port ${port}`) ;
})
