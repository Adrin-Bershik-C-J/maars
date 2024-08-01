const mongoose = require("mongoose");

// Define the OTP schema
const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true, // Ensure phone numbers are unique
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "15m", // Automatically delete OTP after 15 minutes
  },
});

// Create the OTP model
const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
