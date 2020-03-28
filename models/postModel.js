const pool = require('../util/database')

// Creates a new post
exports.createPost = async (postData) => {
	try {
		const sql =
			'INSERT INTO posts (user_id, user_img_url, subject, content, topic) VALUES ("' +
			postData.user_id +
			'","' +
			postData.user_img_url +
			'","' +
			postData.subject +
			'","' +
			postData.content +
			'","' +
			postData.topic +
			'");'
		await pool.execute(sql)
		return
	} catch (err) {
		throw err
	}
}

// Change this to last 5 discussions -- ie not just posts that user started but all participated in)
exports.getLastFiveDiscussions = async (userData) => {
	try {
		const response = await pool.query(
			'SELECT p.post_id, p.user_id, p.user_img_url, p.subject, p.content, p.created_at, p.topic, p.reply_count FROM posts AS p' +
				' LEFT JOIN replies AS r' +
				' ON r.user_id = p.user_id' +
				' WHERE p.user_id = ' +
				userData.user_id +
				' OR r.user_id = ' +
				userData.user_id +
				' ORDER BY created_at DESC LIMIT 5;'
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

/////////////////////////////////////////
exports.getAllPostsByUser = async (userData) => {
	try {
		const response = await pool.query(
			'SELECT * FROM posts WHERE user_id = "' + userData.user_id + '" ORDER BY created_at DESC;'
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
