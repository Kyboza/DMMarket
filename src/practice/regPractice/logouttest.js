const express = require('express')
const router = express.Router();
const logoutControllertest = require('./logoutControllertest')

router.post('/', logoutControllertest.handleLogoutTest)

module.exports = router;