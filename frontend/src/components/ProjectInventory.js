import React, { useEffect } from 'react';
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../ui/Button';
import "./ProjectInventory.css"

// ProjectInventory displays a list of projects that a user can select.
const ProjectInventory = ({ onClose }) => {
    // Access the projects and dispatch function from ProjectsContext.
    const { projects, dispatch } = useProjectsContext();
    // Retrieve user details from AuthContext.
    const { user } = useAuthContext();
    // useNavigate hook for programmatic navigation.
    const navigate = useNavigate();

    // useEffect to fetch projects on component mount or when dependencies change.
    useEffect(() => {
        const fetchProjects = async () => {
            // If there is no user, do not fetch projects.
            if (!user) return;

            // Fetch projects data from the API.
            const response = await fetch('/api/projects', {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            if (response.ok) {
                // Parse the JSON response and dispatch it to the context.
                const userProjects = await response.json();
                dispatch({ type: "SET_PROJECTS", payload: userProjects });
            }
        };

        fetchProjects();
    }, [user, dispatch]);

    // Handler for selecting a project.
    const handleSelectProject = (projectId) => {
        // Save the selected project ID to local storage for persistence.
        localStorage.setItem('selectedProjectId', projectId);
        // Dispatch action to set the current project in the global state.
        dispatch({ type: "SET_CURRENT_PROJECT", payload: projectId });
        // Navigate to the home page to show the selected project details.
        navigate('/');
        // Close any modal or dropdown that might be open.
        onClose();
    };

    // Render the project inventory UI.
    return (
        <div className="ProjectInventory-container">
            {/* Check if there are any projects and render them, otherwise display a message. */}
            {projects.length > 0 ? (
                <ul>
                    {/* Map through projects to display them. The slice().reverse() is used here to reverse the order of projects array. */}
                    {projects.slice().reverse().map((project) => (
                        <Button className="project-button" key={project._id} onClick={() => handleSelectProject(project._id)}>
                            {project.name}
                        </Button>
                    ))}
                </ul>
            ) : (
                <p>No projects found. Start by creating a new one!</p>
            )}
        </div>
    );
};

export default ProjectInventory;
