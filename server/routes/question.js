let express = require('express');
let router = express.Router();
let QuestionModel = require('../models/question');
let AnswerModel = require('../models/answer');
let AgreeModel = require('../models/agree');
let CommentModel = require('../models/comment');
let marked = require('marked');

let checkLogin = require('../middlewares/check').checkLogin;

// markdown文本特殊字符转义
function escaped(str) {
	return str.replace(/\n/g, '\\n')
			  .replace(/\r/g, '\\r')
			  .replace(/'/g, "\\'")
			  .replace(/"/g, '\\"');
}

// GET /question 查看所有问题
router.get('/', (req, res, next) => {
	let author = req.query.author;
	let type = parseInt(req.query.type);
	let data = {
		author: author,
		type: type
	}
	console.log(type)

	QuestionModel.getQuestions(data)
		.then((questions) => {
			res.json({
				code: 200,
				data: {
					list: questions
				}
			});
		})
		.catch(next);
});

// GET /question/create 进入提问页
router.get('/create', checkLogin, (req, res, next) => {
	res.render('create', {
		title: '',
		content: '',
		quesId: '',
		isEdit: 0
	});
});

// POST /question/create 发布一个问题
router.post('/create', checkLogin, (req, res, next) => {
	let author = req.session.user._id;
	let title = req.fields.title;
	let content = req.fields.content;
	let type = parseInt(req.fields.type);

	let question = {
		author: author,
		title: title,
		content: content,
		pv: 0,
		type: type
	};

	QuestionModel.create(question)
		.then((result) => {
			question = result.ops[0];
			// 发布成功后跳转到该问题页
			res.json({
				code: 200,
				msg: '发布成功',
				data: {
					question: question
				}
			});
		})
		.catch(next);
});

// GET /question/:quesId 查看单独一篇的问题页
router.get('/:quesId', (req, res, next) => {
	let quesId = req.params.quesId;

	Promise.all([
		QuestionModel.getQuesById(quesId), // 获取问题信息
		QuestionModel.incPv(quesId) // pv加1
	])
	.then((result) => {
		let question = result[0];
		if (!question) {
			return res.json({
				code: -1,
				msg: '该问题不存在！'
			});
		}
		let data = {
			quesId: question._id,
			title: question.title,
			content: escaped(question.content),
			pv: question.pv,
			author: question.author.name,
			created_at: question.created_at,
			author_name: question.author.name,
			author_id: question.author._id,
			canEdit: 0
		}
		if ( req.session.user && 
			 data.author_id.toString() === req.session.user._id.toString()) {
			data.canEdit = 1;
		}
		res.render('details', data);
	})
	.catch(next);
});

// GET /question/:quesId/answer 获取一篇问题页的所有回答
router.get('/:quesId/answer', (req, res, next) => {
	let quesId = req.params.quesId;

	// 获取该问题下的所有回答
	AnswerModel.getAnswers(quesId)
		.then((answers) => {

			// 递归查询每个回答下的赞同与反对数据以及评论
			function getAgree(i) {
				if (i < answers.length) {
					answers[i].agree = [];
					answers[i].disagree = [];
					// 查询赞同与反对
					AgreeModel.getAgreeById(answers[i]._id)
						.then((result) => {
							for (var j = 0; j < result.length; j++) {
								console.log(result[j].agree);
								if (result[j].agree === 1) {
									answers[i].agree.push(result[j]);
								} else if(result[j].agree === -1) {
									answers[i].disagree.push(result[j]);
								}
							}
							// 查询评论
							CommentModel.getCommentsById(answers[i]._id)
								.then((result) => {
									answers[i].comments = result;
									getAgree(++i);
								})
						});
				} else {
					res.json({
						code: 200, 
						data: {
							answers: answers
						},
						msg: '获取回答成功'
					})
				}
			}
			getAgree(0);
		});
});

// POST /question/:quesId/answer 创建回答
router.post('/:quesId/answer', checkLogin, (req, res, next) => {
	let author = req.session.user._id;
	let quesId = req.params.quesId;
	let content = req.fields.content;
	let answer = {
		author: author,
		quesId: quesId,
		content: content
	};

	AnswerModel.getOneAnswerById(quesId, author)
		.then((result) => {
			console.log(result);
			if (!result) {
				AnswerModel
					.create(answer)
					.then(() => {
						console.log('答案上传成功');
						res.json({
							code: 200,
							msg: '答案上传成功！'
						})
					})
					.catch(next);
			} else {
				return res.json({
					code: -1,
					msg: '您已发表了回答！'
				})
			} 
		})
		.catch(next);
	
});

// GET /question/:quesId/answer/:answerId/remove 删除一条回答
router.get('/:quesId/answer/:answerId/remove', checkLogin, (req, res, next) => {
	let answerId = req.params.answerId;
	let author = req.session.user._id;

	AnswerModel.delAnswerById(answerId, author)
		.then((result) => {
			if (result.result.n !== 0) {
				res.json({
					code: 200,
					msg: '删除留言成功'
				});
			} else {
				res.json({
					code: -1,
					msg: '您无权限进行此操作'
				})
			}
			
		})
		.catch(() => {
			res.json({
				code: -1,
				msg: '您无权限进行此操作'
			})
		});
});

// POST /question/:quseId/answer/:answerId/comment 发表评论
router.post('/:quesId/answer/:answerId/comment', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let answerId = req.params.answerId;
	let author = req.session.user._id;
	let content = req.fields.comment;
	let comment = {
		author: author,
		answerId: answerId,
		quesId: quesId,
		content: content
	}

	CommentModel.create(comment)
		.then(() => {
			return res.json({
				code: 200,
				msg: '发表成功！'
			})
		})
		.catch(next);
});


// GET /question/:quseId/answer/:answerId/cancel/agree 取消赞同
router.get('/:quesId/answer/:answerId/cancel/agree', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let answerId = req.params.answerId;
	let author = req.session.user._id;
	let query = {
		quesId: quesId,
		answerId: answerId,
		author: author,
		agree: 1
	};

	AgreeModel
		.delAgree(query)
		.then(() => {
			return res.json({
				code: 200,
				msg: '取消赞同成功！'
			});
		})
		.catch(next);
	
})

// GET /question/:quseId/answer/:answerId/cancel/disagree 取消赞同
router.get('/:quesId/answer/:answerId/cancel/disagree', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let answerId = req.params.answerId;
	let author = req.session.user._id;
	let query = {
		quesId: quesId,
		answerId: answerId,
		author: author,
		agree: -1
	};

	AgreeModel
		.delAgree(query)
		.then(() => {
			return res.json({
				code: 200,
				msg: '取消反对成功！'
			});
		})
		.catch(next);
	
})

// GET /question/:quesId/answer/:answerId/agree 反对此答案
router.get('/:quesId/answer/:answerId/disagree', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let answerId = req.params.answerId;
	let author = req.session.user._id;
	let agree = {
		quesId: quesId,
		answerId: answerId,
		author: author,
		agree: -1
	}

	AgreeModel.getOneAgreeById({
		quesId: quesId,
		answerId: answerId,
		author: author
	}).then((result) => {
		if (result && result.agree === -1) {
			return res.json({
				code: -1, 
				msg: '您已反对此答案！'
			});
		} else if (result && result.agree === 1) {
			return res.json({
				code: -1,
				msg: '反对前先取消赞同'
			});
		} else {
			AgreeModel
				.create(agree)
				.then(() => {
					return res.json({
						code: 200,
						msg: '反对成功！'
					})
				})
				.catch(next);
		}
	}).catch(next);
});

// GET /question/:quesId/answer/:answerId/agree 为该问题点赞
router.get('/:quesId/answer/:answerId/agree', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let answerId = req.params.answerId;
	let author = req.session.user._id;
	let agree = {
		quesId: quesId,
		answerId: answerId,
		author: author,
		agree: 1
	}

	AgreeModel.getOneAgreeById({
		quesId: quesId,
		answerId: answerId,
		author: author
	}).then((result) => {
		if (result && result.agree === 1) {
			return res.json({
				code: -1,
				msg: '您已赞同此回答！'
			});
		} else if (result && result.agree === -1) {
			return res.json({
				code: -1,
				msg: '赞同前请先取消反对'
			})
		} else {
			AgreeModel.create(agree)
				.then(() => {
					return res.json({
						code: 200,
						msg: '赞同成功！'
					})
				})
				.catch(next);
		}
	}).catch(next);
});

// GET /question/:quesId/edit 更新问题
router.get('/:quesId/edit', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let author = req.session.user._id;

	QuestionModel.getRawQuesById(quesId)
		.then(function(question) {
			if (!question) {
				throw new Error('该文章不存在');
			}
			if (author.toString() !== question.author._id.toString()) {
				throw new Error('权限不足');
			}
			res.render('create', {
				title: question.title,
				content: escaped(question.content),
				quesId: question._id,
				isEdit: 1
			})
		})
});

// POST /question/:quesId/edit 更新一个问题
router.post('/:quesId/edit', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let author = req.session.user._id;
	let title = req.fields.title;
	let content = req.fields.content;

	QuestionModel.updateQuesById(quesId, author, {title: title, content: content})
		.then((question) => {
			if (!question) {
				return new Error('修改失败');
			}
			res.json({
				code: 200,
				msg: '修改成功',
				data: {
					question: question,
					quesId: quesId
				},
				
			});
		})
		.catch(next);
});

// GET /question/:quesId/remove 删除一篇文章
router.get('/:quesId/remove', checkLogin, (req, res, next) => {
	let quesId = req.params.quesId;
	let author = req.session.user._id;
	QuestionModel.delQuesById(quesId, author)
		.then(() => {
			res.redirect('/');
		})
		.catch(next);
});

module.exports = router;
