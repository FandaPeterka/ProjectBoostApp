// Import required libraries
const mongoose = require('mongoose');   // Import mongoose to interact with MongoDB.
const bcrypt = require("bcrypt");       // Import bcrypt for hashing passwords.
const validator = require("validator"); // Import validator to validate and sanitize strings.

// Define Mongoose Schema
const Schema = mongoose.Schema;

// User schema definition with additional 'username' field
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email addresses are unique in the database.
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures usernames are unique in the database.
    },
    password: {
        type: String,
        required: true,
    }
});

// Static method to sign up a new user
userSchema.statics.signup = async function(email, username, password) {
    // Check if all required fields are provided.
    if (!email || !username || !password) {
        throw Error("All fields must be filled");
    }

    // Validate email format using validator library.
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    // Validate password strength using validator library.
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    // Check if email or username already exists in the database.
    const exists = await this.findOne({ $or: [{ email }, { username }] });
    if (exists) {
        throw Error("Email or username already in use");
    }

    // Generate a salt and hash the password using bcrypt.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and return the new user with hashed password.
    const user = await this.create({ email, username, password: hash });
    return user;
};

// Static method to log in a user
userSchema.statics.login = async function(email, password) {
    // Check if email and password fields are filled.
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    // Find the user by email.
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }

    // Compare the provided password with the stored hashed password.
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    // Return user if the password matches.
    return user;
};

// Export the model
module.exports = mongoose.model("User", userSchema);