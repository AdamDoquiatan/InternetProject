const express = require('express')
const app = express()
const userModel = require('../models/userModel')
const postModel = require('../models/postModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderDashboard = async (req, res) => {
	try {
		const userId = req.session.userId
		const userData = await userModel.getUserProfile({ user_id: userId })
		const postData = await postModel.getFiveDiscussions({
			user_id: userId,
			posts_shown: req.session.postsShown
		})

		res.render('dashboard', {
			dashboardJSCSS: true,
			user_data: JSON.stringify(userData),
			post_data: postData
		})
		//res.send(userData)
	} catch (err) {
		res.send('' + err)
	}
}

exports.createPost = async (req, res) => {
	try {
		const postData = gatherPostData(req)
		await postModel.createPost(postData)
		res.redirect('/dashboard')
	} catch (err) {
		res.send('' + err)
	}
}

const gatherPostData = (req) => {
	const postData = {
		user_id: '',
		user_img_url: '',
		subject: '',
		content: '',
		topic: ''
	}

	postData['user_id'] = req.session.userId
	postData['user_img_url'] = req.session.userImgUrl
	postData['subject'] = req.body.subject
	postData['content'] = req.body.content
	postData['topic'] = req.body.topic

	return postData
}

exports.getNextFiveDiscussions = async (req, res) => {
	try {
		const numDiscussions = await postModel.getSumOfAllDiscussions({ user_id: req.session.userId })
		console.log('response: ' + numDiscussions)
		if (req.session.postsShown + 5 > numDiscussions) {
			return
		}
		req.session.postsShown += 5
		res.redirect('/dashboard')
	} catch (err) {
		res.send('' + err)
	}
}

exports.getPreviousFiveDiscussions = async (req, res) => {
	try {
		if (req.session.postsShown - 5 < 0) {
			return
		}
		req.session.postsShown -= 5
		res.redirect('/dashboard')
	} catch (err) {
		res.send('' + err)
	}
}
