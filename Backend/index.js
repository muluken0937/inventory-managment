

// Import necessary modules
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const router = require('./Routes/router');
const userRoutes = require('./Routes/userRoutes');
require('dotenv').config(); // Load environment variables from .env file

// Initialize express app
const app = express();

// Set up port from environment variables or default to 3001
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectToMongo();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies for POST requests

// Define routes
app.use('/api', router); // Use general router for /api routes
app.use('/api/users', userRoutes); // Use user-specific routes for /api/users

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

