const express = require('express')
const router = express.Router()
const profilePageController = require('../controllers/profilePageController')

router.route('/:userId/profilePage').get(profilePageController.renderProfilePage)

module.exports = router
