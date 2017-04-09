var Agree = require('../lib/mongo').Agree;

module.exports = {
	create: function(agree) {
		return Agree.create(agree).exec();
	},

	// 通过回答id获取所有认同和反对
	getAgreeById: function(answerId) {
		return Agree.find({answerId: answerId}).exec();
	},

	// 通过用户id和回答id查询认同条目
	getOneAgreeById: function(query) {
		return Agree.findOne(query).exec();
	},

	// 通过回答id、问题id和用户id删除赞同或反对
	delAgree: function(query) {
		return Agree.remove(query).exec();
	}
}