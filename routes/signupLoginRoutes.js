const express = require('express')
const signupLoginController = require('../controllers/signupLoginController')
const router = express.Router()

router.route('/stashUserSignupData').post(signupLoginController.stashUserSignupData)
router.route('/signup').get(signupLoginController.renderSignupPage)
router.route('/createUser').post(signupLoginController.createUser)
router.route('/postmanSaveUserToDB').post(signupLoginController.postmanSaveUserToDB)
router.route('/validateLoginCredentials').post(signupLoginController.validateLoginCredentials)

module.exports = router
