const asyncHandler = require("express-async-handler");
const twilio = require("twilio");

const OTP = require("../models/otpModel");
const regForm = require("../models/patientModel");
const Chronic = require("../models/chronicModel");

const accountSid = "AC116125f332b1b604579d8e17a036ee49";
const authToken = "976d5648b4a3eb6ab0ca24cdc6bb49ad";
const client = new twilio(accountSid, authToken);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

exports.sendOTP = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  const otpDocument = new OTP({ phone, otp });

  await otpDocument.save();

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: "+14159692428",
      to: phone,
    })
    .then(() => {
      res.status(200).json({ success: true, otp: otp });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: "Failed to send OTP" });
    });
});

exports.verifyOTP = asyncHandler(async (req, res) => {
  const { phone, userOTP } = req.body;
  const otpDocument = await OTP.findOne({ phone, otp: userOTP });

  if (otpDocument) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).send({ success: false, error: "Invalid OTP" });
  }
});
