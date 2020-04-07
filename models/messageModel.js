const pool = require('../util/database')
const userModel = require('../models/userModel')
const nodemailer = require('nodemailer')


exports.createMessage = async(messageData) => {
    try {
        let sql =
            'INSERT INTO messages (convo_id, sender_user_id, reciever_user_id, sender_full_name, sender_user_img_url, content, subject) VALUES ("' +
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
            '", "' +
            messageData.subject +
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

exports.getAllConvoMessages = async(convoData) => {
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
exports.__nameHere__ = async(userData) => {
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


exports.sendMessageEmail = async(messageDetails) => {
    try {
        let mailData = await gatherMailDetails(messageDetails)
        mailServer.sendMail(mailData, function(error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent successfully. ' + info.response)
            }
        })
    } catch (err) {
        throw err
    }
}

const mailServer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sickvibes4711',
        pass: 'comp4711'
    }
})

const gatherMailDetails = async(messageData) => {
    let recieverEmail = await userModel.getUserEmail(messageData.reciever_user_id)
    let mailDetails = {
        from: 'sickvibes4711@gmail.com',
        to: recieverEmail,
        subject: messageData.subject,
        text: messageData.content
    }
    console.log(mailDetails)
    return mailDetails
}