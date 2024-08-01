const express = require("express");
const {
  sendForm,
  patientDetails,
} = require("../controllers/regformController");
const { sendChronicForm } = require("../controllers/chronicFormController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/sendRegForm", sendForm);
router.post("/sendChronicForm", sendChronicForm);
router.get("/details/:phone", validateToken, patientDetails);

module.exports = router;
