const express = require('express')
const app = express()
const path = require('path')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const expressHbs = require('express-handlebars')
app.engine(
	'hbs',
	expressHbs({
		layoutsDir: 'views/layouts/',
		defaultLayout: 'login',
		extname: 'hbs'
	})
)
app.set('view engine', 'hbs')
app.set('views', 'views')

// Points towards location of js and css folders
app.use(express.static(path.join(__dirname, '/public')))

app.listen(process.env.PORT || 3000)
