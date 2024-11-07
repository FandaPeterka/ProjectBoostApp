const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

// Retrieves all projects created by the logged-in user along with their associated tasks.
// This includes populating the tasks related to each project and the username of the project owner.
const getAllProjects = async (req, res) => {
    try {
        // Find all projects owned by the user and populate the associated tasks and user details.
        const projects = await Project.find({ userId: req.user._id })
            .populate('tasks')
            .populate({ path: 'userId', select: 'username' });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Failed to retrieve projects:", error);
        // Respond with a server error and detailed message.
        res.status(500).json({ error: "server_error_project_retrieval", details: error.message });
    }
};

// Retrieves a single project by its ID along with all associated tasks.
// This function is used to fetch detailed information about a specific project.
const getProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId)
            .populate('tasks')
            .populate({ path: 'userId', select: 'username' });
        if (!project) {
            // If no project is found, respond with a 404 error.
            return res.status(404).json({ error: "invalid_project_id", message: "No such project", received: projectId });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project with ID:", projectId, error);
        res.status(500).json({ error: "server_error_project_fetch", details: error.message });
    }
};

// Creates a new project and the specified number of initial tasks.
// This includes input validation and saving new tasks related to the project.
const createProject = async (req, res) => {
    const { name, tasksTimer, tasksNumber } = req.body;

    // Validate input fields to ensure they meet the expected format and type.
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: "invalid_input_name", received: name });
    }
    if (!tasksTimer || typeof tasksTimer !== 'number') {
        return res.status(400).json({ error: "invalid_input_tasksTimer", received: tasksTimer });
    }
    if (!Number.isInteger(tasksNumber) || tasksNumber < 1) {
        return res.status(400).json({ error: "invalid_input_tasksNumber", received: tasksNumber });
    }

    try {
        // Create a new project instance.
        const project = new Project({ name, tasksTimer, userId: req.user._id });
        const tasks = [];
        // Generate tasks as specified by tasksNumber.
        for (let i = 0; i < tasksNumber; i++) {
            const task = new Task({
                text: ``, // Default text for tasks.
                projectId: project._id,
                state: 'not completed' // Default state for new tasks.
            });
            await task.save();
            tasks.push(task);
        }

        // Link tasks to the project and save.
        project.tasks = tasks.map(task => task._id);
        await project.save();
        // Retrieve the fully populated project information to return to the client.
        const populatedProject = await Project.findById(project._id).populate('tasks');
        res.status(201).json(populatedProject);
    } catch (error) {
        console.error("Failed to create project:", error);
        res.status(500).json({ error: "server_error_project_creation", details: error.message });
    }
};

// Deletes a project and all its associated tasks.
// This function handles deletion of both projects and their related tasks in the database.
const deleteProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        // Attempt to find and delete the specified project.
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).json({ error: "invalid_project_id", message: "No such project", received: projectId });
        }
        // Delete all tasks associated with the deleted project.
        await Task.deleteMany({ projectId: project._id });
        res.status(200).json({ message: "Project and associated tasks deleted successfully" });
    } catch (error) {
        console.error("Failed to delete project:", projectId, error);
        res.status(500).json({ error: "server_error_project_deletion", details: error.message });
    }
};

// Updates a project's details such as name and tasksTimer.
// This function allows modifications to existing project properties.
const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { name, tasksTimer } = req.body;
    try {
        // Update the project with the new values and return the updated document.
        const project = await Project.findByIdAndUpdate(projectId, { name, tasksTimer }, { new: true });
        if (!project) {
            return res.status(404).json({ error: "invalid_project_id", message: "No such project", received: projectId });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("Failed to update project:", projectId, error);
        res.status(500).json({ error: "server_error_project_update", details: error.message });
    }
};

// Retrieves all tasks associated with a specific project.
// This function is used to list all tasks of a given project, sorted by creation date.
const getAllTasks = async (req, res) => {
    const { projectId } = req.params;
    try {
        // Find all tasks for the specified project and sort them by creation time.
        const tasks = await Task.find({ projectId }).sort({ createdAt: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Failed to retrieve tasks for project:", projectId, error);
        res.status(500).json({ error: "server_error_tasks_retrieval", details: error.message });
    }
};

// Retrieves a specific task by its ID.
// This function provides detailed information about a single task.
const getTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        // Find the specific task by its ID.
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "invalid_task_id", message: "No such task", received: taskId });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error("Failed to retrieve task:", taskId, error);
        res.status(500).json({ error: "server_error_task_fetch", details: error.message });
    }
};

// Creates a new task within a project.
// This function is used to add a new task to an existing project, validating input for text and state.
const createTask = async (req, res) => {
    const { projectId } = req.params;
    const { text, state } = req.body;
    try {
        // Create a new task with the provided data.
        const task = new Task({ text, state, projectId });
        await task.save();
        // Update the project's task count after adding a new task.
        updateProjectTasksNumber(projectId);
        res.status(201).json(task);
    } catch (error) {
        console.error("Failed to create task:", error);
        res.status(400).json({ error: "server_error_task_creation", details: error.message });
    }
};

// Updates an existing task's details such as text and state.
// This function allows changes to a task's properties.
const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const updateData = req.body;
    try {
        // Update the task with new data and return the updated task.
        const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!task) {
            return res.status(404).json({ error: "invalid_task_id", message: "No such task", received: taskId });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error("Failed to update task:", taskId, error);
        res.status(500).json({ error: "server_error_task_update", details: error.message });
    }
};

// Deletes a specific task.
// This function handles the deletion of a single task and updates the project's task count.
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        // Find and delete the specified task.
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ error: "invalid_task_id", message: "No such task", received: taskId });
        }
        // Update the project's task count after deleting the task.
        updateProjectTasksNumber(task.projectId);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Failed to delete task:", taskId, error);
        res.status(500).json({ error: "server_error_task_deletion", details: error.message });
    }
};

// Function to mark a task as completed
const completeTask = async (req, res) => {
    const { projectId, taskId } = req.params;
    try {
        // Find the task by ID and update its state to 'completed'
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { state: 'completed' },
            { new: true } // Returns the updated document
        );
        if (!updatedTask) {
            return res.status(404).json({ error: "invalid_task_id", message: "No such task", received: taskId });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Failed to complete task:", taskId, error);
        res.status(500).json({ error: "server_error_task_completion", details: error.message });
    }
};


// Utility function to update the tasks count for a project.
// This function recalculates and updates the number of tasks associated with a project.
async function updateProjectTasksNumber(projectId) {
    const tasksCount = await Task.countDocuments({ projectId });
    await Project.findByIdAndUpdate(projectId, { tasksNumber: tasksCount });
}

// Exports all controller functions to be used in routing.
module.exports = {
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
};