const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

router.route('/:userId/dashboard').get(dashboardController.renderDashboard)

module.exports = router
