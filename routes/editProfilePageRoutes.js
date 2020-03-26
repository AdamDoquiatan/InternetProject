const express = require('express')
const router = express.Router()
const editProfilePageController = require('../controllers/editProfilePageController')

router.route('/editProfilePage').get(editProfilePageController.renderEditProfilePage)

module.exports = router
