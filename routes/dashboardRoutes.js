const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

router.route('/dashboard').get(dashboardController.renderDashboard)

module.exports = router
