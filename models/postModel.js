const pool = require('../util/database')

// Creates a new post + incements user's post count
exports.createPost = async (postData) => {
	try {
		let sql =
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

		sql = 'UPDATE users SET post_count = post_count + 1 WHERE user_id = "' + postData.user_id + '";'
		await pool.execute(sql)

		return
	} catch (err) {
		throw err
	}
}

// Gets the last 5 discussions -- not just posts that user started, but also those they've replied to)
exports.getLastFiveDiscussions = async (userData) => {
	try {
		const response = await pool.query(
			'SELECT DISTINCT p.post_id, p.user_id, p.user_img_url, p.subject, p.content, p.created_at, p.topic, p.reply_count FROM posts AS p' +
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

exports.getQueriedPosts = async (queryData) => {
	try {
		const response = await pool.query('SELECT * from posts WHERE subject LIKE "%' + queryData.queryString + '%";')
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

exports.getPostsByTopic = async (queryData) => {
	try {
		const response = await pool.query('SELECT * from posts WHERE topic = "' + queryData.queryString + '";')
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
