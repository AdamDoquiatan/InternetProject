const express = require('express')
const app = express()
const userModel = require('../models/userModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/////// SIGNUP ///////
let stashedUserSignupData = {}

exports.stashUserSignupData = (req, res) => {
	stashedUserSignupData = req.body
	res.send('Data stashed')
}

exports.createUser = async (req, res) => {
	const userData = req.body
	const fullUserData = joinUserAttributes(getStashedUserSignupData(), userData)
	console.log(fullUserData)

	try {
		const userId = await saveUserToDB(fullUserData)
		console.log('here99: ' + userId)
		res.send({ user_id: userId })
	} catch (err) {
		res.status(500).send({ error: err })
	}
}

const joinUserAttributes = (userData, stashedUserSignupData) => {
	return { ...stashedUserSignupData, ...userData }
}

const saveUserToDB = async (fullUserData) => {
	try {
		const userId = await userModel.createUser(fullUserData)
		return userId
	} catch (err) {
		throw err
	}
}

const getStashedUserSignupData = () => {
	return stashedUserSignupData
}

/////// LOGIN ///////
exports.validateLoginCredentials = async (req, res) => {
	try {
		const userId = await userModel.getUserId(req.body)
		console.log('user id: ' + userId)
		res.send({ user_id: userId })
	} catch (err) {
		res.send(err)
	}
}

/////// For Testing Endpoints w/ postman ///////
exports.postmanSaveUserToDB = async (req, res) => {
	try {
		let userData = req.body
		await userModel.createUser(userData)
		res.send('new user added')
	} catch (err) {
		res.send(err)
	}
}
