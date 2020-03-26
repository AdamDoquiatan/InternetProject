const express = require('express')
const signupLoginController = require('../controllers/signupLoginController')
const router = express.Router()

router.route('/processRegistration').post(signupLoginController.processRegistration)
router.route('/signup').get(signupLoginController.renderSignupPage)
router.route('/completeRegistration').post(signupLoginController.completeRegistration)
router.route('/login').post(signupLoginController.login)

module.exports = router
