// Load environment variables from .env file for secure access to credentials
// This is important to keep sensitive data like database URI and secret keys out of the codebase
require("dotenv").config();

// Import the Express module to facilitate web server functionality
// Express is a fast, unopinionated, minimalist web framework for Node.js
const express = require("express");

// Import Mongoose to enable MongoDB interactions
// Mongoose provides a straight-forward, schema-based solution to model your application data
const mongoose = require("mongoose");

// Import routes for user authentication and project management
// These routes define the API endpoints for user and project-related operations
const projectRoutes = require('./routes/projects');  // Ensure this path matches the file location
const userRoutes = require('./routes/user');  // Ensure this path matches the file location

// Initialize the Express application
// This creates an Express application by calling the express function
const app = express();

// Middleware to parse JSON bodies. This enables us to access request data easily.
// This is crucial for processing POST and PUT requests with JSON payloads
app.use(express.json());

// Middleware for logging request details to help with debugging
// This middleware logs the path and HTTP method of every request to the console
app.use((req, res, next) => {
    console.log(req.path, req.method); // Outputs the requested path and the HTTP method used
    next(); // Calls the next middleware or route handler
});

// Route handling
// Set up base paths for the API. All routes defined in projectRoutes and userRoutes will use these base paths
app.use("/api/projects", projectRoutes);  // Handles all requests made to /api/projects
app.use("/api/user", userRoutes);  // Handles all requests made to /api/user

// Establish a connection to the MongoDB database using the URI provided in the .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // This block is executed if the connection to the database is successful
        // Listen for HTTP requests on the port specified in the .env file
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & listening on port", process.env.PORT);  // Confirms successful DB connection and server start
        });
    })
    .catch((error) => {
        // This block handles any errors that occur during the connection attempt
        console.log("Error connecting to MongoDB:", error);  // Logs the error to the console
    });

// Export the configured app for potential use in testing or other server setups
// This is useful for modular applications where you might want to import the app in other files, such as for testing
module.exports = app;