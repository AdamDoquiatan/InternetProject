const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderSendMessagePage = async (req, res) => {
	try {
		res.render('sendMessagePage', { sendMessagePageJSCSS: true })
	} catch (err) {
		res.send('' + err)
	}
}
