var Comment = require('../lib/mongo').Comment;

module.exports = {
	create: function(comment) {
		return Comment.create(comment).exec();
	},

	getCommentsById: function(answerId) {
		return Comment
			.find({ answerId: answerId })
			.populate({ path: 'author', 'model': 'User' })
			.addCreatedAt()
			.exec();
	}
}