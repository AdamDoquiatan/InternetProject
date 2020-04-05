const express = require('express')
const app = express()
const userModel = require('../models/userModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/////// LOGIN ///////
exports.login = async (req, res) => {
	try {
		const userData = await validateLoginCredentials(req)
		if (userData.user_id === undefined) {
			console.log('invalid login credentials')
			return
		} else {
			req.session.userId = userData.user_id
			req.session.fullName = userData.full_name
			req.session.userImgUrl = userData.img_url

			console.log(
				'going to dashboard with userId: ' + req.session.userId + ' and img url: ' + req.session.userImgUrl
			)
			res.redirect('/dashboard')
		}
	} catch (err) {
		throw err
	}
}

const validateLoginCredentials = async (req) => {
	try {
		const userId = await userModel.getUserId(req.body)
		const userData = await userModel.getUserProfile({ user_id: userId })
		console.log('userData: ' + JSON.stringify(userId))
		return userData
	} catch (err) {
		throw err
	}
}

/////// Signup Pt 1 ///////

exports.processRegistration = (req, res) => {
	const userData = gatherUserData(req)
	userdata = validateUserData(userData)
	if (!userData) {
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

	return userData
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
	req.session.fullName = userData.full_name
	req.session.email = userData.email
	req.session.password = userData.password
}
