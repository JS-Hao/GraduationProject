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

app.post('/login', (req, res, next) => {
	console.log(req.body);
	next();
})
app.get('/', (req, res, next) => {
	res.render('index');
});

let server = app.listen(3000, () => {
	let port = server.address().port;
	console.log('Listening at http://localhost:%s', port);
});