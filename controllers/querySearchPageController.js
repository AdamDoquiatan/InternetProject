const express = require('express')
const app = express()
const postModel = require('../models/postModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderQuerySearchPage = async (req, res) => {
	try {
		const queryString = req.query.searchQuery
		const postData = await postModel.getQueriedPosts({ queryString: queryString })
		res.render('querySearchPage', { querySearchPageJSCSS: true, post_data: postData })
	} catch (err) {
		res.send('' + err)
	}
}
