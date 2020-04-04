const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const postModel = require('../models/postModel')
const replyModel = require('../models/replyModel')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderPostRepliesPage = async (req, res) => {
	try {
		const postId = req.query.postId
		const postData = await postModel.getPostById({ post_id: postId })
		const replyData = await replyModel.getAllPostReplies({ post_id: postId })
		res.render('postRepliesPage', {
			postRepliesPageJSCSS: true,
			post_data: JSON.stringify(postData),
			reply_data: JSON.stringify(replyData)
		})
	} catch (err) {
		res.send('' + err)
	}
}
