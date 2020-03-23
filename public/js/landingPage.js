/////// SIGNUP ///////
const processRegistration = async () => {
	const userData = gatherUserData()
	console.log('userdata: ' + JSON.stringify(userData))
	if (!validateUserData(userData)) {
		return
	}
	try {
		stashUserSignupData(userData).then(() => {
			window.location.replace('/signup')
		})
	} catch (err) {
		console.log(err)
	}
}

const gatherUserData = () => {
	const userData = {
		first_name: '',
		last_name: '',
		email: 'this is the default',
		password: '',
		confirm_password: ''
	}

	userData['first_name'] = document.querySelector('.inp_firstName').value
	userData['last_name'] = document.querySelector('.inp_lastName').value
	userData['email'] = document.querySelector('.inp_email_').value
	userData['password'] = document.querySelector('.inp_signupPassword').value
	userData['confirm_password'] = document.querySelector('.inp_confirmPassword').value

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

const stashUserSignupData = async (userData) => {
	console.log('this one:' + JSON.stringify(userData))
	try {
		await fetch('/stashUserSignupData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
	} catch (err) {
		return err
	}
}

/////// LOGIN ///////
const login = async () => {
	const email = document.querySelector('.inp_email').value
	const password = document.querySelector('.inp_login_password').value

	try {
		const response = await validateLoginCredentials(email, password)
		const userId = response['user_id']
		if (userId === undefined) {
			console.log('invalid login credentials')
			return
		} else {
			console.log('going to dashboard with userId: ' + userId)
			window.location.replace('/' + userId + '/dashboard/')
		}
	} catch (err) {
		console.log(err)
		return
	}
}

const validateLoginCredentials = async (email, password) => {
	try {
		const response = await fetch('/validateLoginCredentials', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		const data = await response.json()
		return data
	} catch (err) {
		throw err
	}
}
