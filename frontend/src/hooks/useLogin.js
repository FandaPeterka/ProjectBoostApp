import { useState } from "react";
import { useAuthContext } from "./useAuthContext"; // Import to use the authentication context

// Custom hook for handling user login functionality.
export const useLogin = () => {
    const [error, setError] = useState(null); // State to hold any error messages that may occur during the login process.
    const [isLoading, setIsLoading] = useState(false); // State to manage loading status to provide feedback during the API request.
    const { dispatch } = useAuthContext(); // Retrieve dispatch from useAuthContext to update global authentication state.

    // Function to perform the login, accepting email and password as parameters.
    const login = async (email, password) => {
        setIsLoading(true); // Indicate that the loading process has started.
        setError(null); // Reset the error state to null at the start of a new login attempt.

        try {
            // Perform the POST request to the login API endpoint.
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password }) // Convert the email and password into JSON string.
            });
            const json = await response.json(); // Parse the JSON response from the server.

            if (!response.ok) {
                // If the response is not ok, handle errors.
                setIsLoading(false); // Stop the loading indicator.
                setError(json.error); // Set the error state to the error message received from the server.
            } else {
                // If the login is successful:
                localStorage.setItem("user", JSON.stringify(json)); // Store the user data in local storage.
                dispatch({ type: "LOGIN", payload: json }); // Dispatch a login action to update the global state with the user data.
                setIsLoading(false); // Stop the loading indicator.
                return true; // Return true to indicate that the login was successful.
            }
        } catch (error) {
            // Catch any network or other errors that occur during the fetch operation.
            setIsLoading(false); // Ensure loading is stopped in case of error.
            setError("Failed to login"); // Set a generic error message in case of any exception.
        }
    };

    // Return the login function and the current state of isLoading and error so they can be used by components.
    return { login, isLoading, error };
}