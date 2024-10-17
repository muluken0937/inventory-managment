// Models/AdminRequest.js
const mongoose = require("mongoose");

const adminRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Revoked"], default: "Pending" }, // Added "Revoked"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminRequest", adminRequestSchema);