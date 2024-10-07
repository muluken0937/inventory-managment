const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Super Admin'], // Define roles
        default: 'User' // Default role is 'User'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

// Create User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
