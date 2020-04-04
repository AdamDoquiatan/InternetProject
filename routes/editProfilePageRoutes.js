const express = require('express')
const router = express.Router()
const editProfilePageController = require('../controllers/editProfilePageController')
const is_authenticated = require('../util/is-auth')

router.route('/editProfilePage').get(is_authenticated, editProfilePageController.renderEditProfilePage)
router.route('/updateProfile').post(editProfilePageController.updateProfile)

module.exports = router