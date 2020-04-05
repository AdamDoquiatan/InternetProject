const express = require('express')
const router = express.Router()
const convoPageController = require('../controllers/convoPageController')
const is_authenticated = require('../util/is-auth')

router.route('/convoPage').get(is_authenticated, convoPageController.renderConvoPage)
router.route('/createMessage').post(is_authenticated, convoPageController.createMessage)

module.exports = router
