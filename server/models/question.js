var Question = require('../lib/mongo').Question;
var marked = require('marked');
var AnswerModel = require('./answer');

// 给question添加回答数answersCount
Question.plugin('addAnswersCount', {
	afterFind: function(questions) {
		return Promise.all(questions.map(function(question) {
			return AnswerModel.getAnswersCount(question._id).then(function(answersCount) {
				question.answersCount = answersCount;
				return question;
			}) 
		}))
	},

	afterFindOne: function(question) {
		if (question) {
			return AnswerModel.getAnswersCount(question._id).then(function(count) {
				question.answersCount = count;
				return question;
			});
		}
		return question;
	}
});

module.exports = {
	create: function(question) {
		return Question.create(question).exec();
	},
	// 通过文章id获取一个问题(编辑问题)
	getRawQuesById: function(quesId) {
		return Question
			.findOne({_id: quesId})
			.populate({path: 'author', model: 'User'})
			.exec();
	},

	// 通过用户id和文章id更新一个问题
	updateQuesById: function(quesId, author, data) {
		return Question.update({author: author, _id: quesId}, { $set: data}).exec();
	},

	// 通过用户id和文章Id删除一个问题
	delQuesById: function (quesId, author) {
		return Question
			.remove({author: author, _id: quesId})
			.exec()
			.then(function(res) {
				// 问题删除后再删除该问题下的所有回答
				return AnswerModel.delAnswersByQuesId(quesId);
			});
	},

	getQuesById: function(quesId) {
		return Question
			.findOne({ _id: quesId })
			.populate({ path: 'author', 'model': 'User' })
			.addCreatedAt()
			.addAnswersCount()
			.exec();
	},
	getQuestions: function(data) {
		var query = {};
		if (data.author) {
			query.author = data.author;
		}
		if (data.type) {
			query.type = data.type;
		}
		return Question
			.find(query, {fields: {content: 0}})
			.populate({ path: 'author', model: 'User'})
			.sort({ _id: -1 })
			.addCreatedAt()
			.addAnswersCount()
			.exec();
	},
	incPv: function(quesId) {
		return Question
			.update({ _id: quesId }, {$inc: { pv: 1 } })
			.exec();
	}
}