const mysql = require('mysql2')

// Local Hosted
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'internet_app',
	password: 'password',
	port: 3306
})

// Heroku hosted
// const pool = mysql.createPool({
//   host: '',
//   user: '',
//   database: '',
//   password: '',
//   port:
// })

module.exports = pool.promise()
