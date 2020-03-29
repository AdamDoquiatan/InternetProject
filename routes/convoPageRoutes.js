const express = require('express')
const router = express.Router()
const convoPageController = require('../controllers/convoPageController')
const is_authenticated = require('../util/is-auth')

router.route('/convoPage').get(is_authenticated, convoPageController.renderConvoPage)

module.exports = router
