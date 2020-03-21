const express = require('express')
const app = express()
// const postHelpers = require('./controllerHelpers/postHelpers')
// const replyHelpers = require('./controllerHelpers/replyHelpers')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderQuerySearchPage = async (req, res) => {
	try {
		// These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
		// Right now we're just rendering the raw data to the screen
		// const postData = await postHelpers.getQueriedPosts({})
		// const replyHelpers = await replyHelpers.getAllReplies({})
		// res.render('querySearchPage', { post_data: post_data }, { reply_data: reply_data })
		res.render('querySearchPage', { querySearchPageJSCSS: true })
	} catch (err) {
		res.send('' + err)
	}
}
