const express = require('express')
const app = express()
const userModel = require('../models/userModel.js')
const postModel = require('../models/postModel.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderProfilePage = async (req, res) => {
	try {
		// These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
		// Right now we're just rendering the raw data to the screen
		// NOTE: whatever link calls this needs to add the target userId to the query string
		const userData = await userModel.getUserProfile({ user_id: req.query.userId })
		const postData = await postModel.getAllPostsByUser({ user_id: req.query.userId })
		res.render('profilePage', {
			profilePageJSCSS: true,
			user_data: JSON.stringify(userData),
			post_data: JSON.stringify(postData)
		})
	} catch (err) {
		res.send('' + err)
	}
}
