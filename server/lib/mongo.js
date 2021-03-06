var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

mongolass.connect(config.mongodb);
// 根据id生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
	afterFind: function(results) {
		results.forEach(function(item) {
			item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
		});
		return results;
	},
	afterFindOne: function(result) {
		if (result) {
			result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
		};
		return result;
	}  
});

exports.User = mongolass.model('User', {
	name: {type: 'string'},
	password: {type: 'string'},
	avatar: {type: 'string'},
	gender: {type: 'string', enum: ['m', 'f', 'x']},
	bio: {type: 'string'}
});

exports.User.index({name: 1}, {unique: true}).exec(); //根据用户名找到用户，用户名全局唯一

exports.Question = mongolass.model('Question', {
	author: {type: Mongolass.Types.ObjectId},
	title: {type: 'string'},
	content: {type: 'string'},
	pv: {type: 'number'},
	type: {type: 'number'} 
});

exports.Question.index({ author: 1, _id: -1}).exec(); // 按创建时间降序查看用户的文章列表

exports.Answer = mongolass.model('Answer', {
	author: { type: Mongolass.Types.ObjectId },
	content: { type: 'string' },
	quesId: { type: Mongolass.Types.ObjectId }
});

exports.Answer.index({ quesId: 1, _id: 1 }).exec(); // 通过问题id获取该问题下的所有回答，按回答创建时间升序
exports.Answer.index({ author: 1, _id: 1 }).exec(); // 通过用户id和回答id删除一个回答

exports.Agree = mongolass.model('Agree', {
	quesId: { type: Mongolass.Types.ObjectId },
	answerId: { type: Mongolass.Types.ObjectId },
	author: { type: Mongolass.Types.ObjectId },
	agree: {type: 'number', enum: [1, -1]} // 1: 认同  -1: 反对
});

exports.Agree.index({ answerId: 1, _id: 1 }).exec(); // 通过回答id获取所有人的观点

exports.Comment = mongolass.model('Comment', {
	author: { type: Mongolass.Types.ObjectId },
	answerId: { type: Mongolass.Types.ObjectId },
	quesId: { type: Mongolass.Types.ObjectId },
	content: { type: 'string' }
})

exports.Comment.index({ answerId: 1, _id: 1 }).exec(); // 通过回答id获取所有人的评论