import React, { useState, useEffect } from 'react';
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TaskDetails from './TaskDetails';
import ProgressBar from './ProgressBar';
import Modal from '../ui/Modal';
import ProjectInfo from './ProjectInfo';
import Loading from './Loading'; 
import { MdDelete, MdInfoOutline, MdAdd } from 'react-icons/md';
import DeleteProjectConfirmation from '../components/DeleteProjectConfirmation'; // Import the new component

// The ProjectDetails component displays detailed information about a specific project and its tasks.
const ProjectDetails = ({ project }) => {
    // Context hooks provide access to global state and functions.
    const { dispatch } = useProjectsContext();
    const { user } = useAuthContext();

    // Local state management for modal visibility and loading indicators.
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // Controls the delete confirmation modal.
    const [isLoading, setIsLoading] = useState(false); // Indicates loading state during async operations.

    // useEffect to fetch tasks when the component mounts or relevant dependencies change.
    useEffect(() => {
        if (!user) return; // Exit if no user is authenticated.

        // Fetch tasks from the server for the current project.
        const fetchTasks = async () => {
            setIsLoading(true); // Show loading indicator.
            const response = await fetch(`/api/projects/${project._id}/tasks`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            setIsLoading(false); // Hide loading indicator.

            if (response.ok) {
                const tasks = await response.json();
                // Dispatch action to update the global state with the fetched tasks.
                dispatch({ type: "SET_TASKS", payload: { projectId: project._id, tasks } });
            }
        };

        fetchTasks();
    }, [dispatch, project._id, user]);

    // Function to handle the deletion of the current project.
    const handleDeleteProject = async () => {
        setIsLoading(true); // Show loading indicator.
        const response = await fetch(`/api/projects/${project._id}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${user.token}` }
        });
        setIsLoading(false); // Hide loading indicator.

        if (response.ok) {
            // Dispatch action to remove the project from global state.
            dispatch({ type: "REMOVE_PROJECT", payload: project._id });
            setDeleteConfirmOpen(false); // Close the delete confirmation modal upon successful deletion.
        } else {
            alert("Failed to delete project.");
        }
    };

    // Function to handle the addition of a new task to the current project.
    const handleAddTask = async () => {
        if (!user) return; // Exit if no user is authenticated.

        setIsLoading(true); // Show loading indicator.
        const newTask = {
            text: "", // Default text for a new task.
            state: "not completed", // Default state for new tasks.
            projectId: project._id
        };

        const response = await fetch(`/api/projects/${project._id}/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(newTask)
        });
        setIsLoading(false); // Hide loading indicator.

        if (response.ok) {
            const task = await response.json();
            // Dispatch action to add the new task to global state.
            dispatch({ type: "ADD_TASK", payload: { task, projectId: project._id } });
        }
    };

    // JSX rendering the project details, task list, and control buttons.
    return (
        <div className="mx-auto z-0 mt-[120px] mb-[40px] relative w-3/5 max-h-60vh overflow-y-auto p-5 rounded-lg bg-black bg-opacity-60 shadow-none text-white">
            <div className="flex flex-col items-start text-center mb-5">
                <div className="w-full flex justify-between items-center">
                    <h4 className="font-cursive text-3xl text-rose-200">{project.name}</h4>
                    <button onClick={() => setModalOpen(true)} className="absolute right-0 top-0 bg-transparent m-5 text-inherit">
                        <MdInfoOutline size={30} />
                    </button>
                </div>
                <ProgressBar projectId={project._id} />
            </div>
            {project.tasks?.map((task, index) => (
                <TaskDetails key={task._id} task={task} projectId={project._id} tasksTimer={project.tasksTimer} />
            ))}
            <div className="flex justify-between items-center w-full">
                <button onClick={handleAddTask} className="bg-transparent border-none text-gray-200 cursor-pointer hover:text-white transform hover:scale-110 transition duration-300 ease-in-out text-5xl w-15 h-15 rounded-full flex justify-center items-center">
                    <MdAdd />
                </button>
                <button onClick={() => setDeleteConfirmOpen(true)} className="bg-transparent border-none text-gray-200 cursor-pointer hover:text-white transform hover:scale-110 transition duration-300 ease-in-out text-5xl w-15 h-15 rounded-full flex justify-center items-center">
                    <MdDelete />
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ProjectInfo projectId={project._id} />
            </Modal>
            <DeleteProjectConfirmation 
                isOpen={isDeleteConfirmOpen} 
                onClose={() => setDeleteConfirmOpen(false)} 
                onDelete={handleDeleteProject} 
                projectName={project.name}
            />
            <Loading isOpen={isLoading} onClose={() => setIsLoading(false)} />
        </div>
    );
};

export default ProjectDetails;