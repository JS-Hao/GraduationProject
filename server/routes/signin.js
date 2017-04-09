let express = require('express');
let router = express.Router();
let sha1 = require('sha1');

// 获取用户模型
let UserModel = require('../models/users');
// 获取权限控制
let checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
	res.render('login');
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
	let name = req.fields.username,
		password = req.fields.password;

	// data: 200: 成功登录 
	//         0: 用户不存在 
	//        -1: 用户或密码错误
	UserModel.getUserByName(name)
		.then(function(user) {
			if (!user) {
				req.flash('error', '用户不存在');
				return res.json({
					code: 0, 
					msg: '用户名不存在'
				});
			}
			// 检查密码是否匹配
			if (sha1(password) !== user.password) {
				req.flash('error', '用户名或密码错误');
				return res.json({
					code: -1, 
					meg: '用户名或密码错误'
				});
			}
			req.flash('success', '登录成功');
			// 用户信息写入session
			delete user.password;
			req.session.user = user;
			// 跳转到主页
			res.json({
				code: 200, 
				meg: '登录成功'
			});
		})
		.catch(next);
});

module.exports = router;