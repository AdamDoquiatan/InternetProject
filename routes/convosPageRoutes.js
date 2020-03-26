const express = require('express')
const router = express.Router()
const convosPageController = require('../controllers/convosPageController')
const is_authenticated = require('../util/is-auth')

router.route('/convosPage').get(is_authenticated, convosPageController.renderConvosPage)

module.exports = router
