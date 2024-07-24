const express = require("express");
const { sendForm } = require("../controllers/regformController");

const router = express.Router();

router.post("/sendRegForm", sendForm);

module.exports = router;
