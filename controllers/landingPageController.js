const express = require('express')
const app = express()
const userModel = require('../models/userModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/////// LOGIN ///////
exports.login = async (req, res) => {
	try {
		const userId = await validateLoginCredentials(req)
		if (userId === undefined) {
			console.log('invalid login credentials')
			return
		} else {
			req.session.userId = userId
			console.log('going to dashboard with userId: ' + userId)
			res.redirect('/dashboard')
		}
	} catch (err) {
		throw err
	}
}

const validateLoginCredentials = async (req) => {
	try {
		const userId = await userModel.getUserId(req.body)
		console.log('user id: ' + userId)
		return userId
	} catch (err) {
		throw err
	}
}

/////// Signup Pt 1 ///////

exports.processRegistration = (req, res) => {
	const userData = gatherUserData(req)
	console.log('userdata: ' + JSON.stringify(userData))
	if (!validateUserData(userData)) {
		return
	}
	stashUserSignupData(req, userData)
	res.redirect('/signup')
}

const gatherUserData = (req) => {
	const userData = {
		first_name: '',
		last_name: '',
		email: 'this is the default',
		password: '',
		confirm_password: ''
	}

	userData['first_name'] = req.body.firstName
	userData['last_name'] = req.body.lastName
	userData['email'] = req.body.email
	userData['password'] = req.body.signupPassword
	userData['confirm_password'] = req.body.confirmPassword

	return userData
}

const validateUserData = (userData) => {
	if (!checkAllFieldsFilled(userData) || !checkPasswordFieldsMatch(userData)) {
		return false
	}
	userData['full_name'] = userData.first_name + ' ' + userData.last_name
	delete userData.first_name
	delete userData.last_name
	delete userData.confirm_password

	return true
}

const checkAllFieldsFilled = (userData) => {
	const values = Object.values(userData)
	for (value of values) {
		if (value === '' || value === ' ') {
			console.log('All fields must be filled')
			return false
		}
	}
	return true
}

const checkPasswordFieldsMatch = (userData) => {
	if (userData.password !== userData.confirm_password) {
		console.log('Password fields must match')
		return false
	}
	return true
}

const stashUserSignupData = (req, userData) => {
	req.session.email = userData.email
	req.session.password = userData.password
}
