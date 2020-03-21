const express = require('express')
const router = express.Router()
const editProfilePageController = require('../controllers/editProfilePageController')

router.route('/:userId/editProfilePage').get(editProfilePageController.renderEditProfilePage)

module.exports = router
