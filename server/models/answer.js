var Answer = require('../lib/mongo').Answer;

module.exports = {
	// 创建一个回答
	create: function(answer) {
		return Answer.create(answer).exec();
	},

	// 通过用户id和回答id删除一个回答
	delAnswerById: function(answerId, author) {
		return Answer.remove({author: author, _id: answerId}).exec();
	},

	// 通过问题id删除该问题下的所有回答
	delAnswersByQuesId: function(quesId) {
		return Answer.remove({ quesId: quesId }).exec()
	},

	// 通过问题id获取该问题下所有的回答，按创建时间升序
	getAnswers: function(quesId) {
		return Answer
			.find({ quesId: quesId })
			.populate({ path: 'author', model: 'User' })
			.sort({ _id: 1 })
			.addCreatedAt()
			.exec();
	},

	// 通过问题id和用户id获取该问题下的一个回答
	getOneAnswerById: function(quesId, author) {
		return Answer
			.findOne({ quesId: quesId, author: author })
			.exec();
	},

	// 通过问题id获取该问题下的问题数
	getAnswersCount: function(quesId) {
		return Answer.count({ quesId: quesId }).exec();
	},

	// 通过问题id和回答id对该问题点赞
	updateAgree: function(quesId, answerId, data) {
		return Answer
			.update({quesId: quesId, _id: answerId}, {$set: data}).exec();	
	},

	// 通过问题Id和回答id获取该问题下的所有赞同用户
	getAgreeAndDisagree: function(quesId, answerId) {
		return Answer.find({quesId: quesId, _id: answerId}).exec();
	}
}
