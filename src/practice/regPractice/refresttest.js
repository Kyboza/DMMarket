const express = require('express')
const router = express.Router();
const refreshTokenControllertest = require('./refreshTokenControllertest')

router.post('/', refreshTokenControllertest.handleRefreshTokenTest)

module.exports = router;