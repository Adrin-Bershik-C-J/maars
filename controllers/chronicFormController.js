const asyncHandler = require("express-async-handler");
const chronicPatient = require("../models/chronicModel");

exports.sendChronicForm = asyncHandler(async (req, res) => {
  const {
    phoneNumber,
    name,
    dob,
    age,
    weight,
    height,
    occupation,
    country,
    state,
    city,
    complaint,
    symptoms,
    associatedDisease,
    allopathy,
    diseaseHistory,
    surgeryHistory,
    allergies,
    bodyType,
    clinicReferral,
  } = req.body;
  const chronicPatientDocument = new chronicPatient({
    phoneNumber,
    name,
    dob,
    age,
    weight,
    height,
    occupation,
    country,
    state,
    city,
    complaint,
    symptoms,
    associatedDisease,
    allopathy,
    diseaseHistory,
    surgeryHistory,
    allergies,
    bodyType,
    clinicReferral,
  });
  await chronicPatientDocument.save();
  res.status(201).json({
    message: "Patient data saved successfully",
    patient: chronicPatientDocument,
  });
});
