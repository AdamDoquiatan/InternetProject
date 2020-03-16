const pool = require('../util/database')

exports.getLastFivePosts = async (userData) => {
	try {
		const response = await pool.query(
			'SELECT * FROM posts WHERE user_id = "' + userData.user_id + '" ORDER BY created_at DESC LIMIT 5;'
		)
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
