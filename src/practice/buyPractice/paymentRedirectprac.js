const express = require('express');
const router = express.Router();
const paymentHandlingtest = require('./paymentControllerprac');

router.post('/', paymentHandlingtest);

module.exports = router;