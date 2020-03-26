const express = require('express')
const app = express()
const userHelpers = require('./controllerHelpers/userHelpers')
const postHelpers = require('./controllerHelpers/postHelpers')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderDashboard = async (req, res) => {
	try {
		// These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
		// Right now we're just rendering the raw data to the screen
		const userId = req.session.userId
		const userData = await userHelpers.getProfile({ user_id: userId })
		const postData = await postHelpers.getLastFivePosts({ user_id: userId })
		res.render('dashboard', {
			dashboardJSCSS: true,
			user_data: JSON.stringify(userData),
			post_data: JSON.stringify(postData)
		})
		//res.send(userData)
	} catch (err) {
		res.send('' + err)
	}
}
