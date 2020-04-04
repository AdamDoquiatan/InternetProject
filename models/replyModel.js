const pool = require('../util/database')

exports.getAllPostReplies = async (postData) => {
	try {
		const response = await pool.query('SELECT * FROM replies WHERE post_id = "' + postData.post_id + '";')
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

// SQL Query Template
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
