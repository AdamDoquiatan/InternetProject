const express = require('express')
const router = express.Router()
const sendMessagePageController = require('../controllers/sendMessagePageController')

router.route('/:userId/sendMessagePage').get(sendMessagePageController.renderSendMessagePage)

module.exports = router
