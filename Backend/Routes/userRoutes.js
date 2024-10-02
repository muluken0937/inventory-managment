// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const User = require('../Models/user'); // Adjust the path as necessary
// const router = express.Router();

// // User registration route
// router.post('/register', [
//     body('username')
//         .trim()
//         .isLength({ min: 3 })
//         .withMessage('Username must be at least 3 characters long.')
//         .isAlphanumeric()
//         .withMessage('Username must contain only letters and numbers.'),
    
//     body('email')
//         .isEmail()
//         .withMessage('Invalid email format.')
//         .normalizeEmail(),
    
//     body('password')
//         .isLength({ min: 8 })
//         .withMessage('Password must be at least 8 characters long.')
//         .matches(/\d/)
//         .withMessage('Password must contain at least one number.')
//         .matches(/[A-Z]/)
//         .withMessage('Password must contain at least one uppercase letter.')
//         .matches(/[!@#$%^&*(),.?":{}|<>]/)
//         .withMessage('Password must contain at least one special character.')
//         .trim()
//         .escape()
// ], async (req, res) => {
//     const errors = validationResult(req);
    
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { username, email, password } = req.body;

//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username or email already exists.' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// });

// // User login route
// router.post('/login', [
//     body('email')
//         .isEmail()
//         .withMessage('Invalid email format.')
//         .normalizeEmail(),
    
//     body('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long.')
//         .trim()
//         .escape(),
// ], async (req, res) => {
//     const errors = validationResult(req);
    
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { email, password } = req.body;

//         console.log('Login Attempt:', { email, password }); // Debug log

//         const user = await User.findOne({ email });

//         console.log('Found User:', user); // Debug log

//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log('Password Match:', isMatch); // Debug log

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }

//         res.status(200).json({ message: 'Login successful!', userId: user._id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// });

const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user"); // Adjust the path as necessary
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your secret key

// User registration route
router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long.")
      .isAlphanumeric()
      .withMessage("Username must contain only letters and numbers."),

    body("email")
      .isEmail()
      .withMessage("Invalid email format.")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/\d/)
      .withMessage("Password must contain at least one number.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character.")
      .trim()
      .escape(),

    body("role")
      .isIn(["user", "admin"])
      .withMessage("Role must be either 'user' or 'admin'."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password, role } = req.body; // Include role in the destructured body

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      }); // Include role here
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
);

// User login route
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format.")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long.")
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      console.log("Login Attempt:", { email, password }); // Debug log

      const user = await User.findOne({ email });

      console.log("Found User:", user); // Debug log

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch); // Debug log

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      ); // Token valid for 1 hour

      res.status(200).json({
        message: "Login successful!",
        userId: user._id,
        role: user.role,
        token,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
);

module.exports = router;
