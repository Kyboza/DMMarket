const express = require("express");
const router = express.Router();
const handleVerifyCode = require("../controllers/verifyVerificationController");

router.post("/", handleVerifyCode);

module.exports = router;
