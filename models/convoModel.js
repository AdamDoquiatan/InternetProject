const pool = require('../util/database')

//TODO:
exports.createConvo = async(userData) => {
    try {
        const sql = 'INSERT INTO convos(user1_id, user2_id, user2_img_url) VALUES ("' +
            userData.senderId +
            '", "' +
            userData.recieverId +
            '", "' +
            userData.imgUrl +
            '");'
        const response = await pool.query(sql)
        if (response[0].length !== 0) {
            const responseData = response[0]['insertId']
            console.log(responseData)
            return responseData
        } else {
            return {}
        }
    } catch (err) {
        throw err
    }
}

exports.getAllUsersConvos = async(userData) => {
    try {
        const response = await pool.query(
            'SELECT * FROM convos WHERE user1_id = "' +
            userData.user_id +
            '" OR user2_id ="' +
            userData.user_id +
            '" ORDER BY updated_at DESC;'
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