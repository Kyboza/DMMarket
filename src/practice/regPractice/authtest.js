const express = require('express')
const router = express.Router()
const authControllertest = require('./authControllertest');

router.post('/', authControllertest.handleLogin)

module.exports = router;