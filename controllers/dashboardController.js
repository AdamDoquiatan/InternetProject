const express = require('express')
const app = express()
const userHelpers = require('./controllerHelpers/userHelpers')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderDashboard = async (req, res) => {
	try {
		const userData = await userHelpers.getProfile({ user_id: req.params.userId })
		//const postData = await postHelpers.getLastFivePosts({ user_id: req.params.userId })
		res.render('dashboard', { user_data: JSON.stringify(userData) })
		//res.send(userData)
	} catch (err) {
		res.send('' + err)
	}
}
