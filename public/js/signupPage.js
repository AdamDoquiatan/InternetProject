const processRegistration = async () => {
	const userData = gatherUserData()
	if (!checkAllFieldsFilled(userData)) {
		return
	}
	try {
		const response = await createUser(userData)
		console.log(response)
		window.location.replace('/dashboard')
	} catch (err) {
		console.log(err)
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
		const data = await response.text()
		return data
	} catch (err) {
		return err
	}
}
