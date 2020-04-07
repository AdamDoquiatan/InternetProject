const express = require('express')
const router = express.Router()
const profilePageController = require('../controllers/profilePageController')
const is_authenticated = require('../util/is-auth')

router.route('/profilePage').get(is_authenticated, profilePageController.renderProfilePage)
router.route('/incrementLikes').get(is_authenticated, profilePageController.incrementLikes)

module.exports = router
