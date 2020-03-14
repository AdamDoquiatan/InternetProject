const express = require('express')
const loginController = require('../controllers/loginController')
const router = express.Router()

router.route('/createUser').post(loginController.createUser)
router.route('/validateCredentials').post(loginController.validateCredentials)

module.exports = router
