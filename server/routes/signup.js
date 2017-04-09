let fs = require('fs');
let path = require('path');
let sha1 = require('sha1');
let express = require('express');
let router = express.Router();

let checkNotLogin = require('../middlewares/check').checkNotLogin;
let UserModel = require('../models/users');

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
	res.render('login');
});

// POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
	let name = req.fields.name;
	let password = req.fields.password;
	let repassword = req.fields.repassword;

	// 默认配置
	let gender = 'x';
	let bio = '这个人很懒，什么都没留下';
	let avatar = '';

	// 明文密码加密
	password = sha1(password);

	// 待写入数据库的用户信息
	let user = {
		name: name,
		password: password,
		gender: gender,
		bio: bio,
		avatar: avatar
	}

	// 用户信息写入数据库
	UserModel.create(user)
		.then((result) => {
			user = result.ops[0];
			delete user.password;
			req.session.user = user;
			res.json({
				code: 200,
				msg: '注册成功'
			});
		})
		.catch((e) => {
			if (e.message.match('E11000 duplicate key')) {
				return res.json({
					code: -1,
					msg: '用户名已被占用'
				})
			}
			next(e);
		});
});

module.exports = router;