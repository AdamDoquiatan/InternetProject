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

exports.createReply = async (replyData) => {
	try {
		let sql =
			'INSERT INTO replies (post_id, user_id, user_img_url, content) VALUES ("' +
			replyData.post_id +
			'","' +
			replyData.user_id +
			'","' +
			replyData.user_img_url +
			'","' +
			replyData.content +
			'");'
		await pool.execute(sql)

		sql = 'UPDATE posts SET reply_count = reply_count + 1 WHERE post_id = "' + replyData.post_id + '";'
		await pool.execute(sql)
		return
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
