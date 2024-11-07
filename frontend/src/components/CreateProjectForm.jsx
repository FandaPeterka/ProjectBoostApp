import React, { useState, useContext } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import SliderInput from '../ui/SliderInput'; 
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import Loading from './Loading'; // Ensure the Loading component is correctly imported

// CreateProjectForm allows users to create new projects by submitting a form.
const CreateProjectForm = ({ onClose }) => {
    // State management for form fields and loading indicator.
    const [name, setName] = useState('');
    const [tasksTimer, setTasksTimer] = useState(25);
    const [tasksNumber, setTasksNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    // Access the ProjectsContext for dispatching actions.
    const { dispatch } = useContext(ProjectsContext);
    // Use the AuthContext to check if the user is logged in.
    const { user } = useAuthContext();

    // Handle the submission of the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return; // Do not submit if there is no user.

        setIsLoading(true); // Display the loading indicator.
        const newProject = {
            name,
            tasksTimer,
            tasksNumber,
            userId: user._id // Attach the user ID to the project.
        };

        // Make an API request to create a new project.
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newProject)
        });

        setIsLoading(false); // Hide the loading indicator once the request is complete.
        if (response.ok) {
            const addedProject = await response.json();
            // Dispatch actions to update context state.
            dispatch({ type: 'SET_CURRENT_PROJECT', payload: addedProject._id });
            dispatch({ type: 'ADD_PROJECT', payload: addedProject });
            // Reset form fields to default values.
            setName('');
            setTasksTimer(25);
            setTasksNumber(1);
            onClose(); // Close the form modal after successful creation.
        } else {
            console.error('Failed to create project, response:', await response.json());
        }
    };

    // Render the form component.
    return (
        <form onSubmit={handleSubmit} className="create-project-form">
            {isLoading && <Loading isOpen={isLoading} onClose={() => setIsLoading(false)} />} {/* Conditional rendering of the Loading component. */}
            <TextInput
                label="Project Name:"
                value={name}
                onChange={e => setName(e.target.value)} // Update state when input changes.
            />
            <SliderInput
                label="Tasks Timer (in minutes):"
                value={tasksTimer}
                onChange={e => setTasksTimer(Number(e.target.value))} // Update state when slider changes.
                min={1}
                max={120}
                step={1}
                sliderColorStart="#785db1"
                sliderColorEnd="#b67b82"
            />
            <SliderInput
                label="Number of Initial Tasks:"
                value={tasksNumber}
                onChange={e => setTasksNumber(Number(e.target.value))} // Update state when slider changes.
                min={0}
                max={10}
                step={1}
                sliderColorStart="#785db1"
                sliderColorEnd="#b67b82"
            />
            <Button type="submit" className="primary">Create Project</Button> 
        </form>
    );
};

export default CreateProjectForm;
