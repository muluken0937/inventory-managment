const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const router = require('./Routes/router');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const port = 3001;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router); // Prefix all routes with /api
app.use('/api/users', userRoutes); // Prefix all routes with /api

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
