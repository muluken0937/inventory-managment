


const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user"); // Adjust the path as necessary
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your secret key

// Middleware to check if the user is a Super Admin
const checkSuperAdmin = (req, res, next) => {
  if (req.user.role !== "Super Admin") {
    return res.status(403).json({ message: "Access denied. Only Super Admin can perform this action." });
  }
  next();
};

// Middleware to check if the user is authenticated
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Route to register a Super Admin
router.post(
  "/register-super-admin",
  [
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long."),
    body("email").isEmail().withMessage("Invalid email format."),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
  ],
  async (req, res) => {
    if (process.env.ALLOW_SUPER_ADMIN_REGISTRATION !== "true") {
      return res.status(403).json({ message: "Super Admin registration is not allowed." });
    }
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: "Super Admin",
      });
      await newUser.save();

      // After Super Admin registration, disable further Super Admin registration
      process.env.ALLOW_SUPER_ADMIN_REGISTRATION = "false";

      res.status(201).json({ message: "Super Admin registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
);

// Route to register a user (default role is User)
router.post(
  "/register",
  [
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters long."),
    body("email").isEmail().withMessage("Invalid email format.").normalizeEmail(),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.").trim(),
  ],
  async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: "User", // Default role is User
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
);

// Route for user login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format.").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.").trim(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful!", userId: user._id, role: user.role, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
);

// Grant Admin role (Super Admin only)
router.patch("/grant-admin/:userId", authenticate, checkSuperAdmin, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { role: "Admin" }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: `User ${user.username} is now an Admin.`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Revoke Admin role (Super Admin only)
router.patch("/revoke-admin/:userId", authenticate, checkSuperAdmin, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { role: "User" }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: `User ${user.username} is no longer an Admin.`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Delete user (Super Admin only)
router.delete("/delete-user/:userId", authenticate, checkSuperAdmin, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: `User ${user.username} has been deleted.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Route to get all users (Super Admin only)
router.get("/", authenticate, checkSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field from the response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
