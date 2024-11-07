// Import the required modules
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for handling JWTs.
const User = require("../models/userModel"); // Import the User model to interact with the user database.

/**
 * Middleware to require authentication for routes.
 * @param {object} req - The request object from the client.
 * @param {object} res - The response object to send data to the client.
 * @param {function} next - The next middleware function in the stack.
 */
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers; // Extract the 'authorization' header from the request.

    // Check if the authorization header exists and starts with 'Bearer '
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Authorization token required and must be a Bearer token" });
    }

    const token = authorization.split(" ")[1]; // Extract the token part after 'Bearer '

    try {
        // Verify the token with the secret key and extract the user's ID
        const { _id } = jwt.verify(token, process.env.SECRET);
        
        // Find the user by ID and select only the '_id' field
        req.user = await User.findById(_id).select("_id");

        // If no user is found, return an error
        if (!req.user) {
            return res.status(404).json({ error: "User not found" });
        }

        next(); // Call the next middleware function in the stack if authentication is successful
    } catch (error) {
        console.log(error); // Log the error for debugging purposes
        return res.status(401).json({ error: "Request is not authorized" }); // Return an authorization error
    }
};

// Export the middleware function for use in other parts of the application
module.exports = requireAuth;