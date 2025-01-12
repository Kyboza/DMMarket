const express = require("express");
const router = express.Router();
const resetEmailController = require("../controllers/resetEmailController");

router.post("/", resetEmailController.handleEmailReset);

module.exports = router;
