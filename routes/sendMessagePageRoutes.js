const express = require('express')
const router = express.Router()
const sendMessagePageController = require('../controllers/sendMessagePageController')
const is_authenticated = require('../util/is-auth')

router.route('/sendMessagePage').get(is_authenticated, sendMessagePageController.renderSendMessagePage)

module.exports = router
