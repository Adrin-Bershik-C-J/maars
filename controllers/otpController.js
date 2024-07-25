const asyncHandler = require("express-async-handler");
const twilio = require("twilio");

require("dotenv").config();

const OTP = require("../models/otpModel");
const regForm = require("../models/patientModel");
const Chronic = require("../models/chronicModel");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

exports.sendOTP = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  //Check if he has filled the first form
  const findPhone = await regForm.findOne({ phone });
  if (findPhone) {
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
  } else {
    res.json({ message: "Phone number not registered in Form 1!" });
  }
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
