const mysql = require('mysql2')

// Local Hosted
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'internet_app',
	password: 'password',
	port: 3306
})

// Heroku hosted -- creds via Heroku environment variables
// const pool = mysql.createPool({
//  host: process.env.host,
// 	database: process.env.database,
// 	user: process.env.user,
// 	password: process.env.password,
// 	port: process.env.port
// })

module.exports = pool.promise()
