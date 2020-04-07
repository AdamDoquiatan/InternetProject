const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userModel = require('../models/userModel')
const messageModel = require('../models/messageModel')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderSendMessagePage = async (req, res) => {
	try {
		const recieverImgUrl = await userModel.getUserImgUrl({ user_id: req.query.userId })

		let createMessageInfo = {
			convo_id: 69,
			sender_user_id: req.session.userId,
			reciever_user_id: req.query.userId,
			sender_full_name: req.session.fullName,
			user_img_url: req.session.userImgUrl,
			reciever_img_url: recieverImgUrl[0].img_url
		}
		res.render('sendMessagePage', { sendMessagePageJSCSS: true, message_params: createMessageInfo })
	} catch (err) {
		res.send('' + err)
	}
}

exports.sendMessage = async (req, res) => {
	try {
		console.log(JSON.stringify(req.body))
		await messageModel.createMessage(req.body)
		await messageModel.sendMessageEmail(req.body)
		res.redirect('/profilePage?userId=' + req.body.reciever_user_id)
	} catch (err) {
		res.send('' + err)
	}
}
