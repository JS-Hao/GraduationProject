let express = require('express');
let router = express.Router();

let checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 退出
router.get('/', checkLogin, (req, res, next) => {
	// 清空session中用户信息
	req.session.user = null;
	res.redirect('/');
});

module.exports = router;