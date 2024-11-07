import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { styles } from "../styles";
import { FiLogOut } from 'react-icons/fi';

// Navbar component provides navigation links across the application and logout functionality.
const Navbar = ({ customStyle = false }) => {
    // Hook for logout functionality.
    const { logout } = useLogout();
    // Access user information from AuthContext.
    const { user } = useAuthContext();
    // useNavigate hook for programmatic navigation.
    const navigate = useNavigate();

    // Function to handle user logout.
    const handleClickLogout = () => {
        logout(); // Calls the logout function from useLogout hook.
        navigate('/login'); // Redirects the user to the login page after logout.
    };

    // Dynamically setting the class for the navbar based on the customStyle prop.
    const navbarClass = `${customStyle ? 'navbar-home' : 'navbar-default'} fixed top-0 w-full z-50 bg-primary ${styles.paddingX}`;

    // Render the navigation bar.
    return (
        <nav className={navbarClass}>
            <div className="flex justify-between items-center max-w-7xl mx-auto py-2 sm:py-4">
                <div className="flex gap-1 sm:gap-2">
                    {/* NavLink components are used for navigation with active styles. */}
                    <NavLink 
                        to="/focus-booster" 
                        className={({ isActive }) => `flex items-center gap-1 sm:gap-2 text-lg sm:text-xl font-bold px-2 sm:px-4 py-1 sm:py-2 ${isActive ? "text-white" : "text-gray-400"} hover:text-white`}
                    >
                        <img src="/rocket.png" alt="Rocket Icon" className="h-12 w-12 sm:h-18 sm:w-16" /> 
                    </NavLink>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => `flex items-center gap-1 sm:gap-2 text-2xl sm:text-4xl font-bold px-2 sm:px-4 py-2 sm:py-5 ${isActive ? "text-white" : "text-gray-300"} hover:text-white`}
                    >
                        <span>Home</span>
                    </NavLink>
                </div>
                {/* Conditional rendering based on user authentication status. */}
                {user ? (
                    <div className="flex flex-row items-center gap-3 sm:gap-5">
                        <img src="astronaut.png" className="h-12 w-12 sm:h-12 sm:w-12 rounded-full" alt="Profile" />
                        <div className="text-xl sm:text-2xl font-semibold text-white">{user.username}</div>
                        <FiLogOut className="cursor-pointer text-3xl sm:text-4xl text-white mt-1 sm:mt-2" onClick={handleClickLogout} title="Log Out"/>
                    </div>
                ) : (
                    <div className="flex gap-1 sm:gap-2">
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => `flex items-center text-sm sm:text-lg ${isActive ? "text-white" : "text-gray-400"} hover:text-white`}
                        >
                            Log In
                        </NavLink>
                        <NavLink 
                            to="/signup" 
                            className={({ isActive }) => `flex items-center text-sm sm:text-lg ${isActive ? "text-white" : "text-gray-400"} hover:text-white`}
                        >
                            Sign Up
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;