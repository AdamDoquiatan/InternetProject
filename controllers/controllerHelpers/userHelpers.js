const userModel = require('../../models/userModel')

exports.getProfile = async (userId) => {
	try {
		return await userModel.getUserProfile(userId)
	} catch (err) {
		throw err
	}
}
