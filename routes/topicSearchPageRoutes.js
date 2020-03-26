const express = require('express')
const router = express.Router()
const topicSearchPageController = require('../controllers/topicSearchPageController')

router.route('/topicSearchPage').get(topicSearchPageController.renderTopicSearchPage)

module.exports = router
