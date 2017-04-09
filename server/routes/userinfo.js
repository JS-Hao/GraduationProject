let express = require('express');
let router = express.Router();
let checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /userinfo 获取用户当前状态
router.get('/', (req, res) => {
	if (req.session.user) {
		console.log(req.session.user);
		res.json({
			username: req.session.user.name,
			isLogin: 1,
			user: 'lala'
		});
	} else {
		res.json({
			username: '',
			isLogin: 0
		})
	}
});

module.exports = router;