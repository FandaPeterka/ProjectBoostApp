const express = require("express");
const {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    completeTask
} = require("../controllers/projectController");  // Make sure to include task functions
const requireAuth = require("../middleware/requireAuth");  // Import the authentication middleware

const router = express.Router();

// Apply the requireAuth middleware to all routes in this router
router.use(requireAuth);

// Project routes that now all require authentication
router.get("/", getAllProjects);
router.get("/:projectId", getProject);
router.post("/", createProject);
router.put("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);
// Task routes that now all require authentication
router.get("/:projectId/tasks", getAllTasks);            // Get all tasks for a specific project
router.get("/tasks/:taskId", getTask);                   // Get a specific task by its ID
router.post("/:projectId/tasks", createTask);            // Create a new task within a project
router.patch("/tasks/:taskId", updateTask);              // Update an existing task
router.delete("/tasks/:taskId", deleteTask);             // Delete a task
// Route to complete a task
router.post("/:projectId/tasks/:taskId/complete", completeTask);

module.exports = router;