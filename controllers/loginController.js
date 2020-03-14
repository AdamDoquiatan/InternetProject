const express = require('express')
const app = express()
// const loginModel = require('../models/loginData')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.validateCredentials = (req, res) => {
	loginModel
		.getCredentials()
		.then(([ data, metadata ]) => {
			console.log(data[0]['user_name'] + ' ' + data[0]['password'])
			const validUsername = data[0]['user_name']
			const validPassword = data[0]['password']

			const username = req.body.enteredUsername
			const password = req.body.enteredPassword

			console.log(username === validUsername)
			console.log(password === validPassword)

			if (username === validUsername && password === validPassword) {
				res.send({ redirect: '/dashboard' })
			} else {
				console.log('Wrong credentials -- sorry!')
			}
		})
		.catch((err) => console.log(err))
}

exports.registerUser = (req, res) => {
	loginModel.insertCredentials()
}
