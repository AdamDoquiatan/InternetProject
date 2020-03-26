const express = require('express')
const signupPageController = require('../controllers/signupPageController')
const router = express.Router()

router.route('/signup').get(signupPageController.renderSignupPage)
router.route('/completeRegistration').post(signupPageController.completeRegistration)

module.exports = router
