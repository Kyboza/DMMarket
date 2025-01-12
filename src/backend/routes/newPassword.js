const express = require("express");
const router = express.Router();
const handleNewPassword = require("../controllers/setNewPasswordController");

router.post("/", handleNewPassword);

module.exports = router;
