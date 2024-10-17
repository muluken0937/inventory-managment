// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../Models/user"); // Adjust the path as necessary
// const AdminRequest = require("../Models/AdminRequest"); // Import the new AdminRequest model
// const router = express.Router();

// // Middleware to check if the user is a Super Admin
// const checkSuperAdmin = (req, res, next) => {
//   if (req.user.role !== "Super Admin") {
//     return res.status(403).json({ message: "Access denied. Only Super Admin can perform this action." });
//   }
//   next();
// };

// // Middleware to check if the user is authenticated
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided." });
//   }
//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret_key"); // Replace with your secret key
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token." });
//   }
// };

// // Route for users to request Admin role
// router.post("/request-admin", authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId);

//     // Ensure the user is not already an Admin or Super Admin
//     if (user.role !== "User") {
//       return res.status(403).json({ message: "Only users with 'User' role can request an Admin role." });
//     }

//     const existingRequest = await AdminRequest.findOne({ userId: req.user.userId });
    
//     // If there is an existing pending request, inform the user
//     if (existingRequest && existingRequest.status === "Pending") {
//       return res.status(400).json({ message: "You already have a pending admin role request. Please wait for approval." });
//     }

//     // Allow only one re-request if the previous request was rejected
//     if (existingRequest && existingRequest.status === "Rejected") {
//       existingRequest.status = "Pending"; // Reset status to pending
//       await existingRequest.save();
//       return res.status(201).json({ message: "Your admin role re-request has been submitted successfully!" });
//     }

//     // If no previous request, create a new admin role request
//     const adminRequest = new AdminRequest({ userId: req.user.userId, status: "Pending" });
//     await adminRequest.save();

//     res.status(201).json({ message: "Admin role request submitted successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// // Backend - Example of `/current-role` route implementation
// router.get('/current-role', authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id); // Assuming req.user is populated from the JWT token

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     let roleStatus = user.role; // e.g., "Admin" or "User"
//     let revokedAdmin = user.revokedAdmin || false; // Assume you track this in the user schema

//     // Send current role and revoked status in response
//     res.json({
//       role: roleStatus,
//       revokedAdmin: revokedAdmin,  // Include the revoked status in the response
//     });
//   } catch (error) {
//     console.error('Error fetching user role:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Route for users to check their admin request status
// router.get("/admin-request-status", authenticate, async (req, res) => {
//   try {
//     const adminRequest = await AdminRequest.findOne({ userId: req.user.userId });
//     if (!adminRequest) {
//       return res.status(404).json({ message: "No admin role request found." });
//     }
//     res.status(200).json({ status: adminRequest.status });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// // Route for Super Admin to view all pending admin requests
// router.get("/admin-requests", authenticate, checkSuperAdmin, async (req, res) => {
//   try {
//     const pendingRequests = await AdminRequest.find({ status: "Pending" }).populate("userId", "-password");
//     res.status(200).json(pendingRequests);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// // Route for Super Admin to approve, reject, or revoke an admin request
// router.patch("/admin-requests/:requestId", authenticate, checkSuperAdmin, async (req, res) => {
//   const { requestId } = req.params;
//   const { status } = req.body; // Expecting status to be "Approved", "Rejected", or "Revoked"

//   if (!["Approved", "Rejected", "Revoked"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status. Use 'Approved', 'Rejected', or 'Revoked'." });
//   }

//   try {
//     const adminRequest = await AdminRequest.findById(requestId);
//     if (!adminRequest) {
//       return res.status(404).json({ message: "Admin request not found." });
//     }

//     if (adminRequest.status !== "Pending") {
//       return res.status(400).json({ message: `Cannot change status of a ${adminRequest.status} request.` });
//     }

//     if (status === "Revoked") {
//       await User.findByIdAndUpdate(adminRequest.userId, { role: "User" });
//       adminRequest.status = "Revoked";
//       await adminRequest.save();
//       return res.status(200).json({ message: "Admin request has been revoked. You are now a regular user. Please request again to reapply." });
//     }

//     if (status === "Approved") {
//       await User.findByIdAndUpdate(adminRequest.userId, { role: "Admin" });
//       adminRequest.status = "Approved";
//     } else if (status === "Rejected") {
//       adminRequest.status = "Rejected";
//     }

//     await adminRequest.save();
//     res.status(200).json({ message: `Admin request has been ${status.toLowerCase()}.` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// module.exports = router;


const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const AdminRequest = require("../Models/AdminRequest");
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
    const user = await User.findById(req.user.userId);

    // Ensure the user is not already an Admin or Super Admin
    if (user.role !== "User") {
      return res.status(403).json({ message: "Only users with 'User' role can request an Admin role." });
    }

    // Check if there's already an existing request
    const existingRequest = await AdminRequest.findOne({ userId: req.user.userId });

    // Prevent re-request if the request is still Pending
    if (existingRequest && existingRequest.status === "Pending") {
      return res.status(400).json({ message: "You already have a pending admin role request. Please wait for approval." });
    }

    // If the request was revoked, allow a new request and reset status to "Pending"
    if (existingRequest && existingRequest.status === "Revoked") {
      existingRequest.status = "Pending"; // Reset status to pending
      await existingRequest.save();
      return res.status(201).json({ message: "Your admin role re-request has been submitted successfully!" });
    }

    // Allow re-request only if the previous request was Rejected
    if (existingRequest && existingRequest.status === "Rejected") {
      existingRequest.status = "Pending"; // Reset status to pending
      await existingRequest.save();
      return res.status(201).json({ message: "Your admin role re-request has been submitted successfully!" });
    }

    // If no previous request exists, create a new admin request
    const adminRequest = new AdminRequest({ userId: req.user.userId, status: "Pending" });
    await adminRequest.save();

    res.status(201).json({ message: "Admin role request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// Route for users to check their current role and revoked admin status
router.get("/current-role", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      role: user.role,
      revokedAdmin: user.revokedAdmin || false, // Include revoked admin status if applicable
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for users to check their admin request status
router.get("/admin-request-status", authenticate, async (req, res) => {
  try {
    const adminRequest = await AdminRequest.findOne({ userId: req.user.userId });

    if (!adminRequest) {
      return res.status(404).json({ message: "No admin role request found." });
    }

    res.status(200).json({ status: adminRequest.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Route for Super Admin to view all pending admin requests
router.get("/admin-requests", authenticate, checkSuperAdmin, async (req, res) => {
  try {
    const pendingRequests = await AdminRequest.find({ status: "Pending" }).populate("userId", "-password"); // Populate userId without password
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Route for Super Admin to approve, reject, or revoke an admin request
router.patch("/admin-requests/:requestId", authenticate, checkSuperAdmin, async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["Approved", "Rejected", "Revoked"].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Use 'Approved', 'Rejected', or 'Revoked'." });
  }

  try {
    const adminRequest = await AdminRequest.findById(requestId);

    if (!adminRequest) {
      return res.status(404).json({ message: "Admin request not found." });
    }

    if (adminRequest.status !== "Pending") {
      return res.status(400).json({ message: `Cannot change status of a ${adminRequest.status} request.` });
    }

    if (status === "Revoked") {
      await User.findByIdAndUpdate(adminRequest.userId, { role: "User" });
      adminRequest.status = "Revoked";
      await adminRequest.save();
      return res.status(200).json({ message: "Admin request has been revoked. The user is now a regular user." });
    }

    if (status === "Approved") {
      await User.findByIdAndUpdate(adminRequest.userId, { role: "Admin" });
      adminRequest.status = "Approved";
    } else if (status === "Rejected") {
      adminRequest.status = "Rejected";
    }

    await adminRequest.save();
    res.status(200).json({ message: `Admin request has been ${status.toLowerCase()}.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
