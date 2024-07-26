const express = require("express");
const dbConnection = require("./config/dbConnection.js");
const otpRoute = require("./routes/otpRoutes.js");
const patientRoute = require("./routes/patientRoutes.js");
require("dotenv").config();

dbConnection();

const app = express();

app.use(express.json());
app.use("/api", otpRoute);
app.use("/api/patient", patientRoute);

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
