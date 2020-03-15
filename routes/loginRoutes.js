const express = require('express')
const loginController = require('../controllers/loginController')
const router = express.Router()

router.route('/stashUserSignupData').post(loginController.stashUserSignupData)
router.route('/createUser').post(loginController.createUser)
router.route('/postmanSaveUserToDB').post(loginController.postmanSaveUserToDB)
router.route('/validateLoginCredentials').post(loginController.validateLoginCredentials)

module.exports = router
