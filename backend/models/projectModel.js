const mongoose = require('mongoose'); // Import mongoose to handle your database schema.
const Schema = mongoose.Schema;       // Retrieve the Schema constructor from mongoose to define schemas.

// Define the schema for a project
const projectSchema = new Schema({
    name: {
        type: String,      // Specify the data type of the project name as String.
        required: true     // This field is mandatory.
    },
    tasksTimer: {
        type: Number,      // Define the type as Number to represent time in minutes.
        default: 25        // Set a default timer value for tasks, which is commonly used in the Pomodoro technique.
    },
    tasksNumber: {
        type: Number,      // Define the type as Number to store the count of tasks.
        default: 1         // Set a default value to 1, assuming a new project starts with one task.
    },
    userId: {
        type: Schema.Types.ObjectId, // Use ObjectId to reference another document.
        ref: 'User',                 // This ObjectId refers to the 'User' collection.
        required: true               // This field is mandatory to link the project to a specific user.
    },
    tasks: [{ 
        type: Schema.Types.ObjectId, // Array of ObjectId, each referring to a 'Task' document.
        ref: 'Task'                  // It links to the 'Task' collection for managing project tasks.
    }]
}, {
    timestamps: true // Enable automatic creation of createdAt and updatedAt fields.
});

// Export the model
module.exports = mongoose.model("Project", projectSchema);