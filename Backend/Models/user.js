const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures the username is unique
        trim: true // Removes extra whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures the email is unique
        trim: true,
        lowercase: true // Converts email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for the password
    },
    registrationDate: {
        type: Date,
        default: Date.now // Sets the registration date to the current date
    }
});

// Create User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
