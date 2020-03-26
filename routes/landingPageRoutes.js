const express = require('express')
const landingPageController = require('../controllers/landingPageController')
const router = express.Router()
const is_authenticated = require('../util/is-auth')

router.route('/processRegistration').post(landingPageController.processRegistration)
router.route('/login').post(landingPageController.login)

module.exports = router
