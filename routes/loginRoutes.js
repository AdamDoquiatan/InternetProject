const express = require('express')
const loginController = require('../controllers/loginController')
const router = express.Router()

router.route('/stashUserSignupData').post(loginController.stashUserSignupData)
router.route('/getStashedUserSignupData').get(loginController.getStashedUserSignupData)
router.route('/createUser').post(loginController.createUser)
router.route('/validateCredentials').post(loginController.validateCredentials)

module.exports = router
