const express = require('express')
const router = express.Router()
const convosPageController = require('../controllers/convosPageController')

router.route('/:userId/convosPage').get(convosPageController.renderConvosPage)

module.exports = router
