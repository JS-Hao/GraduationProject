let express = require('express');
let path = require('path');
let ejs = require('ejs');
let bodyParser = require('body-parser');

let app = express();

let data = {
	'0': {
		list: [
			{
				pid: 1,
				timestamp: 234265346,
				answers: 33,
				question: '00000000？',
				desc: '胜多负少的和文具盒谁看见对方sad 商看到建安费可是对方卡萨丁福好看的放开手发送到史蒂夫对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的对方sad 商看到建安费可是对方卡萨丁福好看的'
			},
			{
				pid: 2,
				timestamp: 2378234572,
				answers: 0,
				question: '如何正确吃饭？',
				desc: '胜多负少的和文具盒谁看见对方sad 商看到建安费可是对方卡萨丁福好看的放开手发送到史蒂夫'
			}
		]
	},
	'1': {
		list: [
			{
				pid: 1,
				timestamp: 234265346,
				answers: 33,
				question: '111111111？',
				desc: '胜多负少的和文具盒谁看见对方sad 商看到建安费可是对方卡萨丁福好看的放开手发送到史蒂夫'
			},
			{
				pid: 2,
				timestamp: 2378234572,
				answers: 0,
				question: '如何正确吃饭？',
				desc: '胜多负少的和文具盒谁看见对方sad 商看到建安费可是对方卡萨丁福好看的放开手发送到史蒂夫'
			}
		]
	},
	'2': {
		list: [
			{
				pid: 1,
				timestamp: 234265346,
				answers: 33,
				question: '22222222222？',
				desc: '我啥的开发接口洒落的风景速度快解放了快速打击发送到林峰氨基酸的弗兰克史蒂夫啊克里斯丁分类考试的发',
			},
			{
				pid: 2,
				timestamp: 2378234572,
				answers: 0,
				question: '如何正确吃饭？',
				desc: '胜多负少的和文具盒谁看见对方sad 商看到建安费可是对方卡萨丁福好看的放开手发送到史蒂夫'
			}
		]
	},
	'3': {
		list: [
			{
				pid: 1,
				timestamp: 234265346,
				answers: 33,
				question: '33333333？',
				desc: '胜多负少的和文具盒谁看见对方sad 商看到建安费可是对方卡萨丁福好看的放开手发送到史蒂夫'
			},
			{
				pid: 2,
				timestamp: 2378234572,
				answers: 0,
				question: '如何正确吃饭？',
				desc: '胜多负少的和文具盒谁看见对方sad 商看到建安费可是对方卡萨丁福好看的放开手发送到史蒂夫'
			}
		]
	}
}


// 模板引擎
app.set('views', '../app/view');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('../app/public'));

app.get('/list', (req, res) => {
	let index = parseInt(req.query.index);
	// 进行查询处理，再返回值
	res.json(data[index]);
});

app.get('/login', (req, res) => {
	res.render('login');
})
app.post('/signin', (req, res) => {
	console.log(req.body);
	// res.render('index');
	res.json({code: 200, isLogin: 1});
	// res.redirect('/');
})
app.get('/', (req, res, next) => {
	res.render('index');
});

let server = app.listen(4000, () => {
	let port = server.address().port;
	console.log('Listening at http://localhost:%s', port);
});