const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderDashboard = (req, res, next) => {
	res.send('Dashboard Rendered')
}

exports.renderSearchByQueryPage = (req, res, next) => {
	res.send('SearchByQueryPage Rendered')
}

exports.renderSearchByTopicPage = (req, res, next) => {
	res.send('SearchByTopicPage Rendered')
}

exports.renderProfilePage = (req, res, next) => {
	res.send('ProfilePage Rendered')
}

exports.renderEditProfilePage = (req, res, next) => {
	res.send('EditProfilePage Rendered')
}

exports.renderPostsPage = (req, res, next) => {
	res.send('PostsPage Rendered')
}

exports.renderMessagePage = (req, res, next) => {
	res.send('MessagePage Rendered')
}

exports.renderConvosPage = (req, res, next) => {
	res.send('ConvosPage Rendered')
}

// Replies Field //
exports.pageRenderController = (req, res, next) => {
	res.send('Replies Field Rendered')
}
