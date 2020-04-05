const express = require('express')
const app = express()
const postModel = require('../models/postModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderTopicSearchPage = async (req, res) => {
	try {
		const queryString = req.query.topic
		const postData = await postModel.getPostsByTopic({ queryString: queryString })
		res.render('topicSearchPage', { topicSearchPageJSCSS: true, post_data: postData })
	} catch (err) {
		res.send('' + err)
	}
}
