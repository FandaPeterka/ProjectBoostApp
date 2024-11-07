import React, { createContext, useReducer, useEffect } from "react";

// Creation of the authentication context using React's Context API.
export const AuthContext = createContext();

// Reducer function to handle changes in authentication state.
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":  // Handle login action to set the user.
            return { user: action.payload };
        case "LOGOUT":  // Handle logout action to remove the user.
            return { user: null };
        default:  // Return current state if no relevant action is found.
            return state;
    }
};

// Provider component for the AuthContext, used to wrap parts of the app that need auth state.
export const AuthContextProvider = ({ children }) => {
    // Initialize state and reducer for managing authentication state.
    const [state, dispatch] = useReducer(authReducer, {
        user: null,  // Default state with no authenticated user.
    });

    // useEffect to retrieve the user's authentication state from local storage when the component mounts.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));  // Parse the stored user data.
        if (user) {
            dispatch({ type: "LOGIN", payload: user });  // Dispatch LOGIN action if user data is found.
        }
    }, []);

    // useEffect to update local storage whenever the user state changes.
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));  // Store the user data as a string in local storage.
    }, [state.user]);

    // Rendering the context provider with state and dispatch provided to the value prop.
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}  {/* This will render any child components that need access to the auth context. */}
        </AuthContext.Provider>
    );
};