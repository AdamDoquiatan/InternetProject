const express = require('express')
const router = express.Router()
const querySearchPageController = require('../controllers/querySearchPageController')
const is_authenticated = require('../util/is-auth')

router.route('/querySearchPage').get(is_authenticated, querySearchPageController.renderQuerySearchPage)

module.exports = router
