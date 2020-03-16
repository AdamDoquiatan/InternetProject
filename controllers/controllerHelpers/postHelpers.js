const postModel = require('../../models/postModel')

exports.getLastFivePosts = async (userId) => {
	try {
		return await postModel.getLastFivePosts(userId)
	} catch (err) {
		throw err
	}
}
