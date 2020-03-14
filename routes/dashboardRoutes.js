const express = require('express')
const router = express.Router()
const pageRenderController = require('../controllers/pageRenderController')

router.route('/dashboard').get(pageRenderController.renderDashboard)

module.exports = router
