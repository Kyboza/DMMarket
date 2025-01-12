const express = require("express");
const router = express.Router();
const paymentHandler = require("../controllers/paymentController");

router.post("/", paymentHandler);

module.exports = router;
