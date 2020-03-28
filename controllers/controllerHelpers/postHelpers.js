const postModel = require('../../models/postModel')

exports.createPost = async (req, res) => {
	try {
		const postData = gatherPostData(req)
		return await postModel.createPost(postData)
	} catch (err) {
		throw err
	}
}

const gatherPostData = (req) => {
	const postData = {
		user_id: '',
		user_img_url: '',
		subject: '',
		content: '',
		topic: ''
	}

	postData['user_id'] = req.session.userId
	postData['user_img_url'] = req.body.user_img_url
	postData['subject'] = req.body.subject
	postData['content'] = req.body.content
	postData['topic'] = req.body.topic

	return postData
}

exports.getLastFiveDiscussions = async (userId) => {
	try {
		return await postModel.getLastFiveDiscussions(userId)
	} catch (err) {
		throw err
	}
}
