import React from 'react';
import { useProjectsContext } from '../hooks/useProjectsContext';

// The ProjectInfo component is responsible for displaying detailed information about a specific project.
const ProjectInfo = ({ projectId }) => {
    // Retrieves the projects array from the context provided by useProjectsContext.
    const { projects } = useProjectsContext();
    // Finds the specific project by projectId, assuming projects are stored with an '_id' property.
    const project = projects.find(p => p._id === projectId);

    // If no project is found, the component returns null, effectively rendering nothing.
    if (!project) return null;

    // Accesses the creator's username from the project data. Assumes a nested object structure.
    const creatorName = project.userId.username;  // Accessing the username directly from the userId object.

    // Calculates the total number of tasks for the project.
    const totalTasks = project.tasks.length;
    // Filters and counts how many tasks are marked as 'completed'.
    const completedTasks = project.tasks.filter(task => task.state === 'completed').length;
    // Calculates the number of tasks not completed by subtracting completed tasks from total tasks.
    const notCompletedTasks = totalTasks - completedTasks;

    // JSX to display project details in a structured format.
    return (
        <div>
            <div className="modal-content">
                <p><strong>Project Name:</strong> {project.name}</p>  {/* Displays the project's name. */}
                <p><strong>Created by:</strong> {creatorName}</p>  {/* Displays the creator's username. */}
                <p><strong>Created on:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>  {/* Shows the creation date, formatted to locale. */}
                <p><strong>Total tasks:</strong> {totalTasks}</p>  {/* Shows the total number of tasks. */}
                <p><strong>Completed Tasks:</strong> {completedTasks}</p>  {/* Shows the number of completed tasks. */}
                <p><strong>Not Completed Tasks:</strong> {notCompletedTasks}</p>  {/* Shows the number of tasks not completed. */}
            </div>
        </div>
    );
};

export default ProjectInfo;