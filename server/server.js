let express = require('express');
let path = require('path');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let flash = require('connect-flash');
let config = require('config-lite');
let routes = require('./routes');
let pkg = require('../package');
let ejs = require('ejs');
let bodyParser = require('body-parser');
let app = express();

// 设置引擎目录
app.set('views', '../app/view');
// 设置引擎模板
app.set('view engine', 'ejs');
/*app.engine('html', ejs.renderFile);*/

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));*/

// 设置静态文件目录
app.use('/public', express.static('../app/public'));

// session 中间件
app.use(session({
	name: config.session.key, // 设置 cookie中保存session id字段的名称
	secret: config.session.secret, // 通过设置secret来计算Hash值并放在cookie中，使产生的signedCookie防篡改
	resave: true, // 强制更新session
	saveUninitialized: false, //设置为false，强制创建一个session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge // 过期时间，过期后cookie中的session id自动删除		
	},
	store: new MongoStore({ // 将session存储到mongodb
		url: config.mongodb // mongodbd地址
	})
}));

// flash中间件，用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
	uploadDir: path.join(__dirname, 'public/img'), //上传文件目录
	keepExtensions: true //保留后缀
}));

// 设置模板全局常量
app.locals.common = {
	title: pkg.name,
	rootPath: 'http://localhost:5000'
};

// 添加模板必需的三个变量
app.use(function(req, res, next) {
	res.locals.username = req.session.user ? req.session.user.name : null;
	res.locals.userId = req.session.user ? req.session.user._id : null;
	res.locals.isLogin = req.session.user ? 1 : 0;
	next();
});

// 路由
routes(app);

app.get('/list', (req, res) => {
	let index = parseInt(req.query.index);
	// 进行查询处理，再返回值
	res.json(data[index]);
});

let server = app.listen(config.port, () => {
	console.log(`${pkg.name} listening on http://localhost:${config.port}`);
});