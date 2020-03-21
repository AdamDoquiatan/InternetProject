const express = require('express')
const router = express.Router()
const querySearchPageController = require('../controllers/querySearchPageController')

router.route('/:userId/querySearchPage').get(querySearchPageController.renderQuerySearchPage)

module.exports = router
