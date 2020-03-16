const processRegistration = async () => {
	const userData = gatherUserData()
	if (!checkAllFieldsFilled(userData)) {
		return
	}
	try {
		const userId = await createUser(userData)
		console.log('going to dashboard with userId: ' + userId)
		window.location.replace('/' + userId + '/dashboard/')
	} catch (err) {
		console.log('Error: Please Ensure your date of birth is in format YYYY-MM-DD')
		return
	}
}

const gatherUserData = () => {
	const userData = {
		img_url: '',
		bio: '',
		country: '',
		date_of_birth: ''
	}

	userData['img_url'] = document.querySelector('.inp_imgURL').value
	userData['bio'] = document.querySelector('.inp_bio').value
	userData['country'] = document.querySelector('.inp_country').value
	userData['date_of_birth'] = document.querySelector('.inp_dateOfBirth').value

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

const createUser = async (userData) => {
	try {
		const response = await fetch('/createUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
		const data = await response.json()
		if ('error' in data) {
			throw data['error']
		} else {
			const userId = data['user_id']
			return userId
		}
	} catch (err) {
		throw err
	}
}
