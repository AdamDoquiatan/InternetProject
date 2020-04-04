const express = require('express')
const app = express()
const userModel = require('../models/userModel.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderEditProfilePage = async(req, res) => {
    try {
        // These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
        // Right now we're just rendering the raw data to the screen
        const userData = await userModel.getUserProfile({ user_id: req.session.userId })
        res.render('editProfilePage', { editProfilePageJSCSS: true, user_data: JSON.stringify(userData), fullName: userData.full_name, imgURL: userData.img_url, bio: userData.bio, country: userData.country, dateOfBirth: userData.date_of_birth })
    } catch (err) {
        res.send('' + err)
    }
}


exports.updateProfile = async(req, res) => {
    const updatedData = updatedUserDetails(req)
    try {
        var updatedResponse = await userModel.updateUserProfile(updatedData)
        if (updatedResponse) {
            res.redirect('/dashboard')
        }
    } catch (err) {
        res.send('' + err)
    }
}

/**
 * Creates a collection of details needed to update the user's profile.
 * Expects all fields, even if they are not changed.
 */
const updatedUserDetails = (req) => {
    let updatedData = {
        full_name: '',
        img_url: '',
        bio: '',
        country: '',
        date_of_birth: '',
        user_id: req.session.userId
    }

    console.log(updatedData.user_id)
    updatedData['full_name'] = req.body.fullName
    updatedData['img_url'] = req.body.imgURL
    updatedData['bio'] = req.body.bio
    updatedData['country'] = req.body.country
    updatedData['date_of_birth'] = req.body.dateOfBirth
    return updatedData
}