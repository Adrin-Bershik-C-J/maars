const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");

exports.sendForm = asyncHandler(async (req, res) => {
  const { name, age, mobileNumber, email, gender, diseaseName, diseaseType } = req.body;

  // Check if the patient with the given mobileNumber already exists
  const existingPatient = await Patient.findOne({ mobileNumber });

  if (existingPatient) {
    // If patient already exists, return an error response
    return res.status(400).json({
      message: "Patient with this mobile number already exists",
    });
  }

  // If patient does not exist, create a new patient document
  const patientDocument = new Patient({
    name,
    age,
    mobileNumber,
    email,
    gender,
    diseaseName,
    diseaseType,
  });

  await patientDocument.save();
  
  res.status(201).json({
    message: "Patient data saved successfully",
    patient: patientDocument,
  });
});
