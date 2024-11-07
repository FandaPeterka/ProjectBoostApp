// ./hooks/useSignup
import { useState } from "react";
// Import useAuthContext to use the authentication context throughout the application
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    // State to manage error messages during the signup process
    const [error, setError] = useState(null);
    // State to manage the loading status during the signup API call
    const [isLoading, setIsLoading] = useState(false);
    // Destructure dispatch from the useAuthContext for updating authentication state
    const { dispatch } = useAuthContext();

    // The signup function takes email, password, and optionally username
    const signup = async (email, password, username) => {
        // Initiate loading state
        setIsLoading(true);
        // Clear previous errors
        setError(null);

        try {
            // Make a POST request to the server's signup endpoint
            const response = await fetch("/api/user/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password, username })  // Include username if needed
            });

            const json = await response.json();

            // Check if the HTTP response status is not okay
            if (!response.ok) {
                // Set the error state to the error provided by the server
                setError(json.error);
                setIsLoading(false); // End loading state
            } else {
                // If the signup is successful, store the user data in localStorage
                localStorage.setItem("user", JSON.stringify(json));
                
                // Dispatch LOGIN action to update auth context state
                dispatch({type: "LOGIN", payload: json});
                setIsLoading(false); // End loading state
                return true;
            }
        } catch (err) {
            // Handle errors like network issues
            setError('Failed to sign up');
            setIsLoading(false);
        }
    };

    // Return the signup function, isLoading and error state for use in components
    return { signup, isLoading, error };
};