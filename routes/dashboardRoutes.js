const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const is_authenticated = require('../util/is-auth')
const middleware = require('../util/middleware')

router.route('/dashboard').get(is_authenticated, middleware.addPostsShownToQuery, dashboardController.renderDashboard)
router.route('/createPost').post(is_authenticated, dashboardController.createPost)
router.route('/getNextFiveDiscussions').get(is_authenticated, dashboardController.getNextFiveDiscussions)
router.route('/getPreviousFiveDiscussions').get(is_authenticated, dashboardController.getPreviousFiveDiscussions)

module.exports = router
