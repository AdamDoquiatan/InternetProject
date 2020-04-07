const express = require('express')
const app = express()
const userModel = require('../models/userModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/////// Signup Pt 2 ///////

exports.renderSignupPage = (req, res) => {
	res.render('signupPage', { signupPageJSCSS: true })
}

exports.completeRegistration = async (req, res) => {
	console.log('Checking env logs1: ' + process.env)
	const userData = gatherUserDetails(req)
	if (!checkAllFieldsFilled(userData)) {
		return
	}
	console.log('Checking env logs2: ' + process.env)
	try {
		const userId = await createUser(req, userData)
		req.session.userId = userId

		console.log('going to dashboard with userId: ' + userId)
		res.redirect('/dashboard')
	} catch (err) {
		console.log('Checking env logs3: ' + process.env)
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

const createUser = async (req, userData) => {
	const stashedUserData = req.session
	const fullUserData = joinUserAttributes(stashedUserData, userData)
	console.log('Full user data: ' + JSON.stringify(fullUserData))
	try {
		const userId = await saveUserToDB(fullUserData)
		req.session.userImgUrl = fullUserData.img_url
		req.session.fullName = fullUserData.full_name
		return userId
	} catch (err) {
		throw err
	}
}

const joinUserAttributes = (stashedUserSignupData, userData) => {
	return {
		full_name: stashedUserSignupData.fullName,
		email: stashedUserSignupData.email,
		password: stashedUserSignupData.password,
		...userData
	}
}

const saveUserToDB = async (fullUserData) => {
	try {
		const userId = await userModel.createUser(fullUserData)
		return userId
	} catch (err) {
		throw err
	}
}
