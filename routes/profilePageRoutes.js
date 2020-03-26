const express = require('express')
const router = express.Router()
const profilePageController = require('../controllers/profilePageController')
const is_authenticated = require('../util/is-auth')

router.route('/profilePage').get(is_authenticated, profilePageController.renderProfilePage)

module.exports = router
