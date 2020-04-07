const express = require('express')
const app = express()
const userModel = require('../models/userModel.js')
const postModel = require('../models/postModel.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderProfilePage = async (req, res) => {
	try {
		const userData = await userModel.getUserProfile({ user_id: req.query.userId })
		const postData = await postModel.getAllPostsByUser({ user_id: req.query.userId })
		res.render('profilePage', {
			profilePageJSCSS: true,
			user_data: userData,
			post_data: postData
		})
	} catch (err) {
		res.send('' + err)
	}
}

exports.incrementLikes = async (req, res) => {
	try {
		await userModel.incrementLikes({ user_id: req.query.userId })
		res.redirect('back')
	} catch (err) {
		res.send('' + err)
	}
}
