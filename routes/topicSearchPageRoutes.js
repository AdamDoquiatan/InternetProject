const express = require('express')
const router = express.Router()
const topicSearchPageController = require('../controllers/topicSearchPageController')
const is_authenticated = require('../util/is-auth')

router.route('/topicSearchPage').get(is_authenticated, topicSearchPageController.renderTopicSearchPage)

module.exports = router
