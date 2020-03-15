const processRegistration = async () => {
	const userData = gatherUserData()
	if (!validateUserData(userData)) {
		return
	}
	try {
		await stashUserSignupData(userData)
		window.location.replace('/signup')
	} catch (err) {
		console.log(err)
	}
}

const gatherUserData = () => {
	const userData = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		confirm_password: ''
	}

	userData['first_name'] = document.querySelector('.inp_firstName').value
	userData['last_name'] = document.querySelector('.inp_lastName').value
	userData['email'] = document.querySelector('.inp_email').value
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
	try {
		const response = await fetch('/stashUserSignupData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
		const data = await response.text()
		console.log(data)
	} catch (err) {
		return err
	}
}
