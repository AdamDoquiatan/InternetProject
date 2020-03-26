const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const is_authenticated = require('../util/is-auth')

router.route('/dashboard').get(is_authenticated, dashboardController.renderDashboard)

module.exports = router
