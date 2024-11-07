import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    // Retrieve the dispatch function from the authentication context
    const { dispatch } = useAuthContext();

    // Function to handle user logout
    const logout = () => {
        // Remove the user's token from local storage
        localStorage.removeItem("user");

        // Dispatch the 'LOGOUT' action to update the state in the authentication context
        dispatch({ type: "LOGOUT" });
    }

    // Return the logout function so it can be used wherever the hook is invoked
    return { logout };
}