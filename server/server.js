let express = require('express');
let path = require('path');
let ejs = require('ejs');
let bodyParser = require('body-parser');

let app = express();

// 模板引擎
app.set('views', '../app/view');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('../app/public'));

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