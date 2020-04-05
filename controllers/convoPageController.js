const express = require('express')
const app = express()
const convoModel = require('../models/convoModel.js')
const messageModel = require('../models/messageModel.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderConvoPage = async (req, res) => {
	try {
		const convoData = await convoModel.getAllUsersConvos({ user_id: req.session.userId })
		let messageData = {}
		if (convoData.length > 0 && req.query.convoId) {
			messageData = await messageModel.getAllConvoMessages({ convo_id: req.query.convoId })
		} else if (convoData.length > 0) {
			messageData = await messageModel.getAllConvoMessages({ convo_id: convoData[0].convo_id })
		}

		let otherUser

		for (let message of messageData) {
			if (req.session.userId !== message.sender_user_id) {
				otherUser = message.sender_user_id
				break
			} else {
				otherUser = message.reciever_user_id
				break
			}
		}

		const messageParams = {
			convo_id: req.query.convoId ? req.query.convoId : convoData[0].convo_id,
			sender_user_id: req.session.userId,
			reciever_user_id: otherUser,
			sender_full_name: req.session.fullName,
			user_img_url: req.session.userImgUrl
		}

		res.render('convoPage', {
			convoPageJSCSS: true,
			convo_data: convoData,
			message_params: messageParams,
			message_data: messageData
		})
	} catch (err) {
		res.send('' + err)
	}
}

exports.createMessage = async (req, res) => {
	try {
		await messageModel.createMessage(req.body)
		res.redirect('back')
	} catch (err) {
		res.send('' + err)
	}
}
