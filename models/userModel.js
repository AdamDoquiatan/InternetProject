const pool = require('../util/database')

exports.createUser = async (userData) => {
	try {
		console.log(JSON.stringify(userData))
		//creates a new user
		const sql =
			'INSERT INTO users (email, password, full_name, bio, img_url, country, date_of_birth) VALUES("' +
			userData.email +
			'","' +
			userData.password +
			'","' +
			userData.full_name +
			'","' +
			userData.bio +
			'","' +
			userData.img_url +
			'","' +
			userData.country +
			'","' +
			userData.date_of_birth +
			'");'
		await pool.execute(sql)

		//returns the new user's userId
		const userId = await this.getUserId({ email: userData.email, password: userData.password })
		return userId
	} catch (err) {
		throw err
	}
}

exports.getUserId = async (userData) => {
	try {
		const response = await pool.execute(
			'SELECT user_id FROM users WHERE email = "' +
				userData.email +
				'" && password = "' +
				userData.password +
				'";'
		)
		if (response[0].length === 0) {
			return undefined
		} else {
			const userId = response[0][0]['user_id']
			return userId
		}
	} catch (err) {
		throw err
	}
}

exports.getUserProfile = async (userData) => {
	try {
		console.log(userData)
		const response = await pool.execute(
			'SELECT user_id, full_name, bio, img_url, country, DATE(date_of_birth) as dob, post_count, message_count, like_count FROM users WHERE user_id = "' +
				userData.user_id +
				'";'
		)
		if (response[0].length === 0) {
			throw new Error('User id not found')
		} else {
			const responseData = response[0][0]
			return responseData
		}
	} catch (err) {
		throw err
	}
}

exports.getUserEmail = async (userId) => {
	var sql = 'SELECT email FROM users WHERE user_id = ' + userId + ';'
	let response = await pool.execute(sql)
	return response[0][0]['email']
}
/**
     * Expects JSON data with new user info and updates the SQL database.
     */
exports.updateUserProfile = async (userData) => {
	try {
		//Test to verify received data.
		console.log(JSON.stringify(userData))
		//Create SQL script to edit user details in the DB.
		const sql =
			'UPDATE users SET ' +
			'full_name = "' +
			userData.full_name +
			'",' +
			'img_url = "' +
			userData.img_url +
			'",' +
			'country = "' +
			userData.country +
			'",' +
			'date_of_birth = "' +
			userData.date_of_birth +
			'",' +
			'bio = "' +
			userData.bio +
			'"' +
			'WHERE user_id = "' +
			userData.user_id +
			'";'
		await pool.execute(sql)
		return true
	} catch (err) {
		throw err
	}
}

exports.incrementLikes = async (userData) => {
	try {
		await pool.query('UPDATE users SET like_count = like_count + 1 WHERE user_id = "' + userData.user_id + '";')
	} catch (err) {
		throw err
	}
}

exports.getUserImgUrl = async (userData) => {
	try {
		const response = await pool.query('SELECT img_url from users WHERE user_id = "' + userData.user_id + '";')
		if (response[0].length !== 0) {
			const responseData = response[0]
			return responseData
		} else {
			return {}
		}
	} catch (err) {
		throw err
	}
}

exports.__nameHere__ = async (userData) => {
	try {
		const response = await pool.query()
		if (response[0].length !== 0) {
			const responseData = response[0]
			return responseData
		} else {
			return {}
		}
	} catch (err) {
		throw err
	}
}
