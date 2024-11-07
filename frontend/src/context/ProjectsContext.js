import React, { createContext, useReducer } from "react";

// Creating the context for projects
export const ProjectsContext = createContext();

// Initial state setup
const initialState = {
    projects: [],  // Initializes an empty array of projects
    currentProjectId: null  // Tracks the currently selected project
};

// Reducer function to handle actions
const projectsReducer = (state, action) => {
    switch (action.type) {
        case "SET_PROJECTS":
            return {
                ...state,
                projects: action.payload.map(newProject => {
                    const existingProject = state.projects.find(p => p._id === newProject._id);
                    return existingProject ? {...newProject, tasks: existingProject.tasks} : {...newProject, tasks: []};
                })
            };
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [{ ...action.payload, tasks: action.payload.tasks || [] }, ...state.projects]
            };
        case "REMOVE_PROJECT":
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload)
            };
        case "SET_CURRENT_PROJECT":
            return {
                ...state,
                currentProjectId: action.payload
            };
        case "ADD_TASK":
            return {
                ...state,
                projects: state.projects.map(project => {
                    if (project._id === action.payload.projectId) {
                        const updatedTasks = [...project.tasks, action.payload.task];
                        return {...project, tasks: updatedTasks};
                    }
                    return project;
                })
            };
        case "REMOVE_TASK":
            return {
                ...state,
                projects: state.projects.map(project => {
                    if (project._id === action.payload.projectId) {
                        const updatedTasks = project.tasks.filter(task => task._id !== action.payload.taskId);
                        return {...project, tasks: updatedTasks};
                    }
                    return project;
                })
            };
        case "SET_TASKS":
        case "UPDATE_TASK_TEXT":
            return {
                ...state,
                projects: updateProjects(state.projects, action)
            };
        case "UPDATE_TASK_STATE":
            return {
                ...state,
                projects: updateTaskState(state.projects, action)
            };
        default:
            return state;
    }
};

// Helper function to update projects based on the action payload
function updateProjects(projects, action) {
    return projects.map(project =>
        project._id === action.payload.projectId ? { ...project, tasks: updateTasks(project.tasks, action) } : project
    );
}

// Helper function to update tasks based on the action payload
function updateTasks(tasks, action) {
    switch (action.type) {
        case "SET_TASKS":
            return action.payload.tasks;
        case "UPDATE_TASK_TEXT":
            return tasks.map(task => 
                task._id === action.payload.taskId ? { ...task, text: action.payload.text } : task
            );
        default:
            return tasks;
    }
}

// Additional helper function for updating task states
function updateTaskState(projects, action) {
    return projects.map(project => {
        if (project._id === action.payload.projectId) {
            return {
                ...project,
                tasks: project.tasks.map(task => {
                    if (task._id === action.payload.taskId) {
                        return { ...task, state: action.payload.updates.state };
                    }
                    return task;
                })
            };
        }
        return project;
    });
}

// Provider component that exposes the context
export const ProjectsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectsReducer, initialState);

    return (
        <ProjectsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProjectsContext.Provider>
    );
};