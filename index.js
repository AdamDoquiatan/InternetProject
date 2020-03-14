const express = require('express')
const app = express()
const path = require('path')

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

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let dashboardRoutes = require('./routes/dashboardRoutes')
app.use('/', dashboardRoutes)

// Points towards location of js and css folders
app.use(express.static(path.join(__dirname, '/public')))

// Remember to Change res.send to res.render when using Handlebars
app.get('/', (req, res) => {
	res.send('Landing Page Rendered')
})

app.get('/signup', (req, res) => {
	res.send('Signup Page Rendered')
})

app.listen(process.env.PORT || 3000)
