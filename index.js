const express = require("express");
const mongoose = require("mongoose");
const otpRoute = require("./routes/otpRoutes.js");
const patientRoute = require("./routes/patientRoutes.js");

const app = express();

app.use(express.json());
app.use("/api", otpRoute);
app.use("/api/patient", patientRoute);

const PORT = 8000;

//mongoose.set("debug", true); // Enable detailed logging

mongoose
  .connect("mongodb://127.0.0.1:27017/clinic", {
    serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
    connectTimeoutMS: 10000, // Timeout after 10s instead of no timeout
  })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//adrin