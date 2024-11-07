import React, { useEffect, useCallback, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ProjectDetails from "../components/ProjectDetails";
import Navbar from "../components/Navbar";
import ProjectNavbar from "../components/ProjectNavbar";

// The Home component serves as the primary view where users interact with projects and other dynamic content.
const Home = () => {
    // Accessing projects data and dispatch method from ProjectsContext
    const { projects, currentProjectId, dispatch } = useProjectsContext();
    // Accessing user information from AuthContext
    const { user } = useAuthContext();
    // Hook for navigating programmatically between routes
    const navigate = useNavigate();

    // State for managing the background component dynamically
    const [BackgroundComponent, setBackgroundComponent] = useState(() => {
        // Attempt to load the background setting from local storage
        const savedBackground = localStorage.getItem('selectedBackground');
        // Dynamically import the background component, defaulting to 'Meteors' if none is set
        return savedBackground
            ? lazy(() => import(`../animations/${savedBackground}`))
            : lazy(() => import('../animations/Meteors'));
    });

    // useCallback ensures this function is memoized and not recreated on every render, only when dependencies change
    const fetchProjects = useCallback(() => {
        // Only proceed if there is a logged-in user
        if (user) {
            fetch("/api/projects", {
                headers: { "Authorization": `Bearer ${user.token}` }
            }).then(response => {
                if (response.ok) {
                    // Process the fetched projects data
                    response.json().then(fetchedProjects => {
                        // Dispatch an action to update the projects in the global state
                        dispatch({ type: "SET_PROJECTS", payload: fetchedProjects });
                    });
                } else {
                    throw new Error('Failed to load projects');
                }
            }).catch(error => {
                console.error("Error fetching projects:", error);
            });
        } else {
            // Redirect to login page if no user is found
            navigate('/login');
        }
    }, [user, dispatch, navigate]);

    // useEffect to trigger fetchProjects upon component mount or when dependencies change
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Handler for changing the background component
    const onChangeBackground = (backgroundName) => {
        // Store the new background setting in local storage
        localStorage.setItem('selectedBackground', backgroundName);
        // Update the background component state to reflect the new choice
        setBackgroundComponent(() => lazy(() => import(`../animations/${backgroundName}`)));
    };

    // Determine the currently selected project based on the currentProjectId from the context
    const selectedProject = projects.find(project => project._id === currentProjectId);

    // Rendering the main Home component UI
    return (
        <div className="home" style={{ overflowY: 'auto', height: '100vh', background: 'transparent' }}>
            {/* Suspense wrapper for lazy-loaded background component with fallback content */}
            <Suspense fallback={<div>Loading Background...</div>}>
                <BackgroundComponent />
            </Suspense>
            {/* Navigation bars and conditional rendering of the ProjectDetails or a prompt */}
            <Navbar customStyle={true} />
            <ProjectNavbar onChangeBackground={onChangeBackground} />
            {selectedProject ? (
                <div className="projects">
                    <ProjectDetails project={selectedProject} />
                </div>
            ) : (
                <p>Select a project to view details.</p>
            )}
        </div>
    );
};

export default Home;