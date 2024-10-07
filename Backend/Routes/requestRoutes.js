const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../Models/user"); // Adjust the path as necessary
const AdminRequest = require("../Models/AdminRequest"); // Import the new AdminRequest model
const router = express.Router();

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
    const decoded = jwt.verify(token, "your_jwt_secret_key"); // Replace with your secret key
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Route for users to request Admin role
router.post("/request-admin", authenticate, async (req, res) => {
  try {
    // Check if the user already has an admin request
    const existingRequest = await AdminRequest.findOne({ userId: req.user.userId });
    if (existingRequest) {
      return res.status(400).json({ message: "You have already requested an admin role. Please wait for approval." });
    }

    // Create a new admin request
    const adminRequest = new AdminRequest({ userId: req.user.userId });
    await adminRequest.save();

    res.status(201).json({ message: "Admin role request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Route for Super Admin to view all pending admin requests
router.get("/admin-requests", authenticate, checkSuperAdmin, async (req, res) => {
  try {
    const pendingRequests = await AdminRequest.find({ status: "Pending" }).populate("userId", "-password");
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Route for Super Admin to approve or reject an admin request
router.patch("/admin-requests/:requestId", authenticate, checkSuperAdmin, async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body; // Expecting status to be "Approved" or "Rejected"

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Use 'Approved' or 'Rejected'." });
  }

  try {
    // Find the admin request and update its status
    const adminRequest = await AdminRequest.findById(requestId);
    if (!adminRequest) {
      return res.status(404).json({ message: "Admin request not found." });
    }

    adminRequest.status = status;
    await adminRequest.save();

    if (status === "Approved") {
      // If approved, update the user's role to Admin
      await User.findByIdAndUpdate(adminRequest.userId, { role: "Admin" });
    }

    res.status(200).json({ message: `Admin request has been ${status.toLowerCase()}.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
