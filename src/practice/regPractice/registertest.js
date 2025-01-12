const express = require('express')
const router = express.Router();
const registerControllertest = require('./registerControllertest')

router.post('/', registerControllertest.handleNewUserTest)

module.exports = router;