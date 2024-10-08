const express        = require("express");
const colors         = require("colors"); // Allows color/underline/etc in console
const dotenv         = require("dotenv").config(); // Allows .env file to hold environmental varialbes
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB      = require('./config/db');
const port           = process.env.PORT || 5000;
const cors           = require('cors');
const app            = express();

// Allows API to receive requests from localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your front-end URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to allow credentials
};

// Activates cors with above parameters
app.use(cors(corsOptions));

// Runs function from /config/db.js
connectDB();


// Parses request and response data into JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Makes it so for any requests that go to /api/goals (or /api/goals/:id) it uses the goalRoutes file
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Enables error handler middleware
app.use(errorHandler);

// Starts up server on port
app.listen(port, () => {
   console.log(`Server started on port ${port}`) ;
})
