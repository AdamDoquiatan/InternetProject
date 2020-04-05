const pool = require('../util/database')

exports.createMessage = async (messageData) => {
	try {
		let sql =
			'INSERT INTO messages (convo_id, sender_user_id, reciever_user_id, sender_full_name, sender_user_img_url, content) VALUES ("' +
			messageData.convo_id +
			'", "' +
			messageData.sender_user_id +
			'", "' +
			messageData.reciever_user_id +
			'" , "' +
			messageData.sender_full_name +
			'" , "' +
			messageData.user_img_url +
			'", "' +
			messageData.content +
			'" );'
		await pool.query(sql)

		sql =
			'UPDATE users SET message_count = message_count + 1 WHERE user_id = "' + messageData.reciever_user_id + '";'
		await pool.query(sql)

		return
	} catch (err) {
		throw err
	}
}

exports.getAllConvoMessages = async (convoData) => {
	try {
		const response = await pool.query('SELECT * FROM messages WHERE convo_id = "' + convoData.convo_id + '";')
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
