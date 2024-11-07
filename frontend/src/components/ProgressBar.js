import React from 'react';
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import './ProgressBar.css'; // Ensure this CSS file is created and linked correctly

// ProgressBar component displays the completion rate of tasks for a specific project.
const ProgressBar = ({ projectId }) => {
    // Accessing the projects from the ProjectsContext.
    const { projects } = useProjectsContext();
    // Accessing the user information from AuthContext to check if the user is logged in.
    const { user } = useAuthContext();
    // Finding the specific project by projectId.
    const project = projects.find(p => p._id === projectId);

    // Display a message if the project is not found.
    if (!project) {
        return <div>No project found</div>;
    }

    // Calculating the total number of tasks.
    const totalTasks = project.tasks.length;
    // Calculating the number of completed tasks.
    const completedTasks = project.tasks.filter(task => task.state === 'completed').length;
    // Calculating the completion rate as a percentage.
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Render the progress bar with dynamic width based on the completion rate.
    return (
        <div className="progress-bar-container">
            {user ? (
                // Conditional rendering based on user authentication. Shows progress bar if user is logged in.
                <div className="progress-bar" style={{ width: `${completionRate}%` }}>
                    {Math.round(completionRate)}%  {/* Displaying the rounded completion percentage inside the bar. */}
                </div>
            ) : (
                // Message displayed if the user is not logged in.
                <div>Please log in to view progress.</div>
            )}
        </div>
    );
};

export default ProgressBar;