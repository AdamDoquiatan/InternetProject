const pool = require('../util/database')

exports.createUser = (userData) => {
	console.log(userData.userId)
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
	return pool.execute(sql)

	exports.getCredentials = () => {
		return pool.execute('SELECT user_name, password FROM users WHERE user_id = 1')
	}
}
