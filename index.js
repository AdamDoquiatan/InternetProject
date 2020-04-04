const express = require('express')
const app = express()
const path = require('path')

const expressHbs = require('express-handlebars')
app.engine(
	'hbs',
	expressHbs({
		layoutsDir: 'views/layouts/',
		defaultLayout: 'baseLayout',
		extname: 'hbs'
	})
)
app.set('view engine', 'hbs')
app.set('views', 'views')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let session = require('express-session')
app.use(
	session({
		secret: 'secret',
		name: 'session_data',
		resave: true,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			httpOnly: true,
			// maxAge: 600000 //10 minutes
			maxAge: 365 * 24 * 60 * 60 * 1000 //one year
		}
	})
)

let landingPageRoutes = require('./routes/landingPageRoutes')
app.use('/', landingPageRoutes)

let signupPageRoutes = require('./routes/signupPageRoutes')
app.use('/', signupPageRoutes)

let dashboardRoutes = require('./routes/dashboardRoutes')
app.use('/', dashboardRoutes)

let convoPageRoutes = require('./routes/convoPageRoutes')
app.use('/', convoPageRoutes)

let editProfilePageRoutes = require('./routes/editProfilePageRoutes')
app.use('/', editProfilePageRoutes)

let profilePageRoutes = require('./routes/profilePageRoutes')
app.use('/', profilePageRoutes)

let querySearchPageRoutes = require('./routes/querySearchPageRoutes')
app.use('/', querySearchPageRoutes)

let sendMessagePageRoutes = require('./routes/sendMessagePageRoutes')
app.use('/', sendMessagePageRoutes)

let topicSearchPageRoutes = require('./routes/topicSearchPageRoutes')
app.use('/', topicSearchPageRoutes)

let postRepliesPageRoutes = require('./routes/postRepliesPageRoutes')
app.use('/', postRepliesPageRoutes)

// Points towards location of js and css folders
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
	req.session.destroy()
	res.render('landingPage', { landingPageJSCSS: true })
})

app.listen(process.env.PORT || 3000)
