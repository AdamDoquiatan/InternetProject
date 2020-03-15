const processRegistration = async () => {
	const firstData = await getStashedUserSignupData()
	console.log(firstData)
	const secondData = gatherSecondUserData()
	console.log(secondData)
	// if (!validateUserData(userData)) {
	//   return
	// }
	//window.location.replace('/signup')
}

const getStashedUserSignupData = async (userData) => {
	await fetch('/getStashedUserSignupData')
		.then((response) => {
			const data = response.json()
			console.log(data)
			return data
		})
		.catch((err) => console.log(err))
}

const gatherSecondUserData = () => {
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
