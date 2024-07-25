const express = require("express");
const { sendForm } = require("../controllers/regformController");
const { sendChronicForm } = require("../controllers/chronicFormController");

const router = express.Router();

router.post("/sendRegForm", sendForm);
router.post("/sendChronicForm", sendChronicForm);

module.exports = router;
