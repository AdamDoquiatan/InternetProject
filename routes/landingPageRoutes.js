const express = require('express')
const landingPageController = require('../controllers/landingPageController')
const router = express.Router()

router.route('/processRegistration').post(landingPageController.processRegistration)
router.route('/login').post(landingPageController.login)

module.exports = router
