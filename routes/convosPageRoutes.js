const express = require('express')
const router = express.Router()
const convosPageController = require('../controllers/convosPageController')

router.route('/convosPage').get(convosPageController.renderConvosPage)

module.exports = router
