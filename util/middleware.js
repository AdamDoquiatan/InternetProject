exports.addPostsShownToQuery = (req, res, next) => {
	if (!req.session.postsShown) {
		// this wont appear in the url, but it's still accessible
		req.session.postsShown = 0
	}

	next()
}
