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
		console.log('this: ' + JSON.stringify(postData))
		const replyData = await replyModel.getAllPostReplies({ post_id: postId })
		console.log('this: ' + JSON.stringify(replyData))
		res.render('postRepliesPage', {
			postRepliesPageJSCSS: true,
			post_data: postData,
			post_id: postData[0].post_id,
			reply_data: replyData
		})
	} catch (err) {
		res.send('' + err)
	}
}

exports.createReply = async (req, res) => {
	try {
		const replyData = gatherReplyData(req)
		await replyModel.createReply(replyData)
		res.redirect('back')
	} catch (err) {
		res.send('' + err)
	}
}

const gatherReplyData = (req) => {
	const replyData = {
		post_id: '',
		user_id: '',
		user_img_url: '',
		content: ''
	}

	console.log(req.body.postId)

	replyData['post_id'] = req.body.postId
	replyData['user_id'] = req.session.userId
	replyData['user_img_url'] = req.session.userImgUrl
	replyData['content'] = req.body.content

	return replyData
}
