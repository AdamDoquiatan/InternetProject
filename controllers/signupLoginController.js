const express = require('express')
const app = express()
const userModel = require('../models/userModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/////// SIGNUP -- Landing Page ///////

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
	if (!checkAllFieldsFilledLandingPage(userData) || !checkPasswordFieldsMatch(userData)) {
		return false
	}
	userData['full_name'] = userData.first_name + ' ' + userData.last_name
	delete userData.first_name
	delete userData.last_name
	delete userData.confirm_password

	return true
}

const checkAllFieldsFilledLandingPage = (userData) => {
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

exports.renderSignupPage = (req, res) => {
	res.render('signupPage', { signupPageJSCSS: true })
}

/////// SIGNUP -- Signup Page ///////

exports.completeRegistration = async (req, res) => {
	const userData = gatherUserDetails(req)
	if (!checkAllFieldsFilledSignupPage(userData)) {
		return
	}
	try {
		const userId = await createUser(req, userData)
		console.log('going to dashboard with userId: ' + userId)
		res.redirect('/dashboard')
	} catch (err) {
		console.log('DB Error: Please Ensure your date of birth is in format YYYY-MM-DD')
		return
	}
}

const gatherUserDetails = (req) => {
	const userData = {
		img_url: '',
		bio: '',
		country: '',
		date_of_birth: ''
	}

	userData['img_url'] = req.body.imgURL
	userData['bio'] = req.body.bio
	userData['country'] = req.body.country
	userData['date_of_birth'] = req.body.dateOfBirth

	return userData
}

const checkAllFieldsFilledSignupPage = (userData) => {
	const values = Object.values(userData)
	for (value of values) {
		if (value === '' || value === ' ') {
			console.log('All fields must be filled')
			return false
		}
	}
	return true
}

const createUser = async (req, userData) => {
	const stashedUserData = req.session
	const fullUserData = joinUserAttributes(stashedUserData, userData)
	console.log('Full user data: ' + JSON.stringify(fullUserData))

	try {
		const userId = await saveUserToDB(fullUserData)
		return userId
	} catch (err) {
		throw err
	}
}

const joinUserAttributes = (stashedUserSignupData, userData) => {
	return { email: stashedUserSignupData.email, password: stashedUserSignupData.password, ...userData }
}

const saveUserToDB = async (fullUserData) => {
	try {
		const userId = await userModel.createUser(fullUserData)
		return userId
	} catch (err) {
		throw err
	}
}

/////// LOGIN ///////
exports.login = async (req, res) => {
	try {
		const userId = await validateLoginCredentials(req)
		if (userId === undefined) {
			console.log('invalid login credentials')
			return
		} else {
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
