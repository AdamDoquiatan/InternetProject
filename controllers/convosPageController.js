const express = require('express')
const app = express()
// const userHelpers = require('./controllerHelpers/userHelpers')
// const convosHelpers = require('./controllerHelpers/messagesHelpers')
// const messagesHelpers = require('./controllerHelpers/messagesHelpers')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderConvosPage = async (req, res) => {
	try {
		// These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
		// Right now we're just rendering the raw data to the screen
		// const userData = await userHelpers.getProfile({})
		// const convosData = await convosHelpers.getAllConvos({})
		// const messagesData = await messagesData.getAllMessages({})
		// res.render('convosPage', { user_data: userData }, { convosData: convosData }, { messagesData: messagesData })
		res.render('convosPage', { convosPageJSCSS: true })
	} catch (err) {
		res.send('' + err)
	}
}
