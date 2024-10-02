// const mongoose = require('mongoose');

// // User Schema
// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true, //
//         trim: true // Removes extra whitespace
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, // 
//         trim: true,
//         lowercase: true // 
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 8 // 
//     },
//     registrationDate: {
//         type: Date,
//         default: Date.now // Sets the registration date to the current date
//     }
// });

// // Create User model
// const User = mongoose.model("User", UserSchema);

// module.exports = User;

const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true // Removes extra whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true // Ensures the email is stored in lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Password must be at least 8 characters long
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Role can either be 'user' or 'admin'
        default: 'user' // Default role is 'user'
    },
    registrationDate: {
        type: Date,
        default: Date.now // Sets the registration date to the current date
    }
});

// Create User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
