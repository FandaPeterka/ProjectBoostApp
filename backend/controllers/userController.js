// Import the User model to interact with the MongoDB User collection
const User = require("../models/userModel");
// Import JWT for token generation to secure the authentication process
const jwt = require("jsonwebtoken");

/**
 * Helper function to generate a JWT token.
 * This function signs a JWT with the user's database ID and sets an expiration of 3 days.
 * @param {string} _id - The MongoDB ObjectId of a user.
 * @returns {string} A JWT signed with the user's ID.
 */
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

/**
 * Controller function for user login.
 * @param {object} req - The request object containing the user's credentials.
 * @param {object} res - The response object used to send back the HTTP response.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;  // Extract email and password from request body

    try {
        // Attempt to authenticate the user using the User model's login method
        const user = await User.login(email, password);
        // Generate a JWT for the authenticated user
        const token = createToken(user._id);
        // Send successful response back with user email, username, and token
        res.status(200).json({ email: user.email, username: user.username, token });
    } catch (error) {
        // If authentication fails, send a 400 bad request response with the error message
        console.error("Login failed:", error);
        res.status(400).json({ error: error.message });
    }
}

/**
 * Controller function for user signup.
 * @param {object} req - The request object containing the new user's details.
 * @param {object} res - The response object used to send back the HTTP response.
 */
const signupUser = async (req, res) => {
    const { email, username, password } = req.body; // Extract email, username, and password from request body
    console.log("Attempting to sign up with:", email, username);

    try {
        // Check if a user already exists with the same email or username
        const exists = await User.findOne({ $or: [{ email }, { username }] });
        console.log("User exists check:", exists);
        if (exists) {
            // If user exists, throw an error to prevent signup
            throw Error("Email or username already in use");
        }

        // If user does not exist, proceed with signup process
        const user = await User.signup(email, username, password);
        console.log("Signed up user:", user);
        // Generate a JWT for the new user
        const token = createToken(user._id);
        // Send successful response back with user email, username, and token
        res.status(200).json({ email: user.email, username: user.username, token });
    } catch (error) {
        // If signup fails, log the error and send a 400 bad request response
        console.error("Signup error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// Export the controller functions to be used in routes
module.exports = { signupUser, loginUser };