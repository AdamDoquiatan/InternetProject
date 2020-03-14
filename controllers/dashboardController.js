const express = require('express')
const app = express()
const userModel = require('../models/userModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderDashboard = async (req, res) => {
	// let result1 = await userModel.test1()
	// let result2 = await userModel.test2()
	// let result3 = await userModel.test3()
	// let obj = {
	// 	'1': result1,
	// 	'2': result2,
	// 	'3': result3
	// }
	// res.send(obj)

	res.send('Dashboard Rendered')
}
