const processRegistration = () => {
	const userData = gatherUserData()
	console.log(userData)
	if (!validateUserData(userData)) {
		return
	}
	window.location.replace('/signup')
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
	const values = Object.values(userData)
	for (value of values) {
		console.log('value: ' + value)
		if (value === '' || value === ' ') {
			console.log('All fields must be filled')
			return false
		}
	}
	if (userData.password !== userData.confirm_password) {
		console.log('Password fields must match')
		return false
	}
	userData['full_name'] = userData.first_name + ' ' + userData.last_name
	delete userData.first_name
	delete userData.last_name
	delete userData.confirm_password
	console.log(userData)
	return true
}
