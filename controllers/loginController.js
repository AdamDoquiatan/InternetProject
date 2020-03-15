const express = require('express')
const app = express()
const loginModel = require('../models/userModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
		const response = await saveUserToDB(fullUserData)
		res.send(response)
	} catch (err) {
		res.send(err)
	}
}

const joinUserAttributes = (userData, stashedUserSignupData) => {
	return { ...stashedUserSignupData, ...userData }
}

const saveUserToDB = async (fullUserData) => {
	try {
		await loginModel.createUser(fullUserData)
		return 'new user added'
	} catch (err) {
		throw err
	}
}

const getStashedUserSignupData = () => {
	return stashedUserSignupData
}

exports.validateLoginCredentials = (req, res) => {
	// loginModel
	// 	.getCredentials()
	// 	.then(([ data, metadata ]) => {
	// 		console.log(data[0]['user_name'] + ' ' + data[0]['password'])
	// 		const validUsername = data[0]['user_name']
	// 		const validPassword = data[0]['password']
	// 		const username = req.body.enteredUsername
	// 		const password = req.body.enteredPassword
	// 		console.log(username === validUsername)
	// 		console.log(password === validPassword)
	// 		if (username === validUsername && password === validPassword) {
	// 			res.send({ redirect: '/dashboard' })
	// 		} else {
	// 			console.log('Wrong credentials -- sorry!')
	// 		}
	// 	})
	// 	.catch((err) => console.log(err))
}

// For Testing w/ postman
exports.postmanSaveUserToDB = async (req, res) => {
	try {
		let userData = req.body
		await loginModel.createUser(userData)
		res.send('new user added')
	} catch (err) {
		res.send(err)
	}
}
