const express = require('express')
const router = express.Router()
const postRepliesPageController = require('../controllers/postRepliesPageController')
const is_authenticated = require('../util/is-auth')

router.route('/postRepliesPage').get(is_authenticated, postRepliesPageController.renderPostRepliesPage)

module.exports = router
