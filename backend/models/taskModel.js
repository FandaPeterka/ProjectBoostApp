// Import mongoose for schema definition and model creation
const mongoose = require('mongoose');

// Define Mongoose Schema
const Schema = mongoose.Schema;

// Task schema definition
const taskSchema = new Schema({
    // Task description text
    text: {
        type: String,        // Define the type of data as String.
        required: false      // Make this field optional.
    },
    // Task state with predefined values
    state: {
        type: String,        // Define the type of data as String.
        enum: ['completed', 'not completed'],  // Limit the possible values to these two options.
        default: 'not completed'  // Set a default value if none is provided.
    },
    // Reference to the Project ID to which the task belongs
    projectId: {
        type: Schema.Types.ObjectId,  // Use ObjectId to reference another document.
        ref: 'Project',               // Specify that it refers to a 'Project' model.
        required: true                // Make this field mandatory.
    }
}, {
    // Automatically add createdAt and updatedAt timestamps to each document.
    timestamps: true
});

// Create and export the Task model to interact with the Tasks collection
module.exports = mongoose.model("Task", taskSchema);