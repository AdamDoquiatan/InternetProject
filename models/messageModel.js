const pool = require('../util/database')

//NOTE: Untested -- may or may not work
exports.createMessage = async (convoData) => {
	try {
		const response = await pool.query(
			'INSERT INTO messages (convo_id, sender_user_id, reciever_user_id, sender_user_img_url, content) VALUES ("' +
				convoData.convo_id +
				'", "' +
				convoData.sender_user_id +
				'", "' +
				convoData.reciever_user_id +
				'" , "' +
				convoData.user_img_url +
				'", "' +
				convoData.content +
				'" );'
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
